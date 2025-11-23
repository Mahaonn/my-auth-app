"use client"; // Это клиентский компонент для интерактивности (хуки React)

import { useRouter } from "next/navigation"; // Хук для перенаправления
import { useActionState, useEffect } from "react"; // Хук для обработки состояния формы из auth.ts
import { login } from "../actions/auth"; // Импортируем функцию login из auth.ts

// Тип FormState берётся из auth.ts, но для простоты не указываем (TypeScript подхватит)

export default function LoginForm() {
  const router = useRouter(); // Хук для перенаправления
  const [state, action, pending] = useActionState(login, undefined); // Связываем с server action login

  useEffect(() => {
    if (state?.success) {
      router.push("/profile"); // Перенаправляем на профиль при успешном входе
    }
  }, [state?.success, router]); // Следим за изменением состояния успеха643

  return (
    <form
      action={action}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="email"
          style={{ fontWeight: "600", fontSize: "0.875rem" }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid var(--foreground)",
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--foreground)")}
        />
        {state?.errors?.email && (
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#dc2626" }}>
            {state.errors.email.map((error) => (
              <li key={error} style={{ fontSize: "0.875rem" }}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Поле для пароля */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="password"
          style={{ fontWeight: "600", fontSize: "0.875rem" }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          style={{
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid var(--foreground)",
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--foreground)")}
        />
        {state?.errors?.password && (
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#dc2626" }}>
            {state.errors.password.map((error) => (
              <li key={error} style={{ fontSize: "0.875rem" }}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Общее сообщение об ошибке (например, неверный email/пароль) */}
      {state?.message && (
        <p
          style={{
            color: "#dc2626",
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          {state.message}
        </p>
      )}

      {/* Кнопка */}
      <button
        type="submit"
        style={{
          marginTop: "0.5rem",
          padding: "0.75rem",
          fontSize: "1rem",
          fontWeight: "600",
          backgroundColor: "var(--accent)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#1d4ed8")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--accent)")
        }
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
