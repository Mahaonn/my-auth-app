"use server"; // Это директива Next.js: Все функции в файле — Server Actions (выполняются только на сервере)

import { z } from "zod"; // Библиотека для валидации данных
import bcrypt from "bcrypt"; // Для хэширования паролей
import { Prisma } from "@prisma/client"; // Для обработки ошибок Prisma
import { db } from "../lib/db"; // Подключение к базе данных (Prisma Client)
import { createSession } from "../lib/session"; // Функция для создания сессии
import { deleteSession } from "../lib/session"; // Функция для удаления сессии
import { redirect } from "next/navigation"; // Для перенаправления после успеха

// Схема валидации для регистрации (signup)
const SignupSchema = z.object({
  name: z.string().min(2, "Имя минимум 2 символа"),
  email: z.string().email("Неверный email"),
  password: z
    .string()
    .min(8, "Пароль минимум 8 символов")
    .regex(/[a-zA-Z]/, "Должен содержать хотя бы одну букву")
    .regex(/[0-9]/, "Должен содержать хотя бы одну цифру"),
});

// Схема валидации для логина (login) — проще, без имени
const LoginSchema = z.object({
  email: z.string().email("Неверный email"),
  password: z.string().min(8, "Пароль минимум 8 символов"),
});

// Тип для состояния формы (возвращается в клиент для отображения ошибок)
type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

// Функция для регистрации (signup)
export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Валидация данных из формы
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10); // Хэшируем пароль для безопасности

  try {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        message:
          "Email уже существует. Попробуйте войти или используйте другой email.",
      };
    }

    // Создаём нового пользователя в базе
    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Создаём сессию и перенаправляем
    await createSession(user.id.toString());
    redirect("/profile");
  } catch (error) {
    // Обработка ошибок от Prisma (на случай unique violation или других)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Код для unique violation
        return {
          message:
            "Email уже существует. Попробуйте войти или используйте другой email.",
        };
      }
    }
    console.error(error); // Логируем ошибку для дебага
    return { message: "Произошла ошибка при регистрации. Попробуйте позже." };
  }
}

// Функция для логина (login)
export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Валидация данных из формы
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  try {
    // Находим пользователя по email
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "Неверный email или пароль." }; // Не уточняем, что именно неверно — для безопасности
    }

    // Сравниваем введённый пароль с хэшированным в базе
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: "Неверный email или пароль." };
    }

    // Создаём сессию и перенаправляем
    await createSession(user.id.toString());
    redirect("/profile");
  } catch (error) {
    console.error(error); // Логируем ошибку
    return { message: "Произошла ошибка при входе. Попробуйте позже." };
  }
}

// Функция для логаута (logout)
export async function logout() {
  await deleteSession(); // Удаляем сессию (куку)
  redirect("/login"); // Перенаправляем на страницу логина
  // Возвращать ничего не нужно, т.к. будет редирект
}
