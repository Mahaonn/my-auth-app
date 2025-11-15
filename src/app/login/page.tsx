"use client"; // Это клиентский компонент для интерактивности (хуки React)

import { useState } from "react";
import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  const [hover, setHover] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "var(--background)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "var(--card-background)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Login
        </h1>
        <LoginForm />
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.875rem",
            color: "var(--foreground)",
          }}
        >
          Don&#39;t have an account?{" "}
          <a
            href="/signup"
            style={{
              backgroundColor: "transparent",
              color: hover ? "#3b5ab9ff" : "var(--accent)",
              textDecoration: "underline",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </main>
  );
}
