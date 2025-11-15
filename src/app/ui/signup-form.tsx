"use client"; // This is a client component

import { useActionState } from "react";
import { signup } from "../actions/auth";

export default function SignupForm() {
  const [state, action] = useActionState(signup, undefined);

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
        {" "}
        <label
          htmlFor="name"
          style={{ fontWeight: "600", fontSize: "0.875rem" }}
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Name"
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
        {state?.errors?.name && (
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#dc2626" }}>
            {state.errors.name.map((error) => (
              <li key={error} style={{ fontSize: "0.875rem" }}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      {}
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
            border: "1px solid #d1d5db",
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--foreground)")}
        />
        {state?.errors?.email && (
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "red" }}>
            {state.errors.email.map((error) => (
              <li key={error} style={{ fontSize: "0.875rem" }}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      {}
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
        Sign Up
      </button>
    </form>
  );
}
