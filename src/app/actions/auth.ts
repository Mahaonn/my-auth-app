"use server"; // Next.js directive: all functions in this file are Server Actions (executed only on the server)

import { z } from "zod"; // Library for data validation
import bcrypt from "bcrypt"; // For password hashing
import { Prisma } from "@prisma/client"; // For handling Prisma errors
import { db } from "../lib/db"; // Prisma Client connection
import { createSession } from "../lib/session"; // Function to create a session
import { deleteSession } from "../lib/session"; // Function to delete a session
import { redirect } from "next/navigation"; // For navigation redirects after success

// Validation schema for signup
const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Must contain at least one letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

// Validation schema for login — simpler, no name field
const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Type for form state (returned to client for displaying errors)
type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean; // ✅ new field
    }
  | undefined;

// Signup function
export async function signup(
  _prevState: FormState, // Can be used to access the previous form state (e.g., show past errors, accumulate messages, or track login attempts)
  formData: FormData
): Promise<FormState> {
  // Validate form data
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password for security

  try {
    // Check if user with this email already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        message: "Email already exists. Try logging in or use another email.",
      };
    }

    // Create new user in the database
    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Create session and redirect
    await createSession(user.id.toString());
    return { success: true };
  } catch (error) {
    // Handle Prisma errors (e.g. unique violation)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique violation code
        return {
          message: "Email already exists. Try logging in or use another email.",
        };
      }
    }
    console.error(error); // Log error for debugging
    return {
      message: "An error occurred during signup. Please try again later.",
    };
  }
}

// Login function
export async function login(
  _prevState: FormState, // Can be used to access the previous form state (e.g., show past errors, accumulate messages, or track login attempts)
  formData: FormData
): Promise<FormState> {
  // Validate form data
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  try {
    // Find user by email
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "Invalid email or password." }; // Do not specify which one is wrong for security
    }

    // Compare entered password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: "Invalid email or password." };
    }

    // Create session and redirect
    await createSession(user.id.toString());
    return { success: true };
  } catch (error) {
    console.error(error); // Log error
    return {
      message: "An error occurred during login. Please try again later.",
    };
  }
}

// Logout function
export async function logout() {
  await deleteSession(); // Delete session (cookie)
  redirect("/login"); // Redirect to login page
  // No return needed since redirect is performed
}
