"use client"; // Клиентский, для onClick

import { useFormStatus } from "react-dom"; // Для pending состояния (опционально)
import { logout } from "../actions/auth"; // Импортируем server action

export default function LogoutButton() {
  const { pending } = useFormStatus(); // Показываем "loading" если нужно

  return (
    <form action={logout}>
      <button
        type="submit"
        disabled={pending}
        style={{
          backgroundColor: "#ff4d4d",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {pending ? "Выходим..." : "Выйти"}
      </button>
    </form>
  );
}
// Кнопка отправляет форму на server action logout, который удаляет сессию и перенаправляет
// pending состояние показывает "Выходим..." пока запрос в процессе
