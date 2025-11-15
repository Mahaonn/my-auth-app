"use client"; // This is a client component

import { useState } from "react";
import SignupForm from "@/app/ui/signup-form";

export default function SignupPage() {
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
          Registration
        </h1>
        <SignupForm />
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.875rem",
            color: "var(--foreground)",
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              backgroundColor: "transparent",
              color: hover ? "#3b5ab9ff" : "var(--accent)",
              textDecoration: "underline",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
