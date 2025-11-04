import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
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
          backgroundColor: "white",
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
          Вход
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
          Нет аккаунта?{" "}
          <a
            href="/signup"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </main>
  );
}
