"use client"; // This is a client component

import { useActionState } from "react";
import { signup } from "../actions/auth";

export default function SignupForm() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" placeholder="Name" />
      {state?.errors?.name && (
        <ul style={{ color: "red" }}>
          {state.errors.name.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {}
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" placeholder="Email" />
      {state?.errors?.email && (
        <ul style={{ color: "red" }}>
          {state.errors.email.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {}
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      {state?.errors?.password && (
        <ul style={{ color: "red" }}>
          {state.errors.password.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {state?.message && <p style={{ color: "red" }}>{state.message}</p>} {}
      <button type="submit">Sign Up</button>
    </form>
  );
}
