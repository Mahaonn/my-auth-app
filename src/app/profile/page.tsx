import { getUserFromSession } from "../lib/session"; // Создадим helper для получения пользователя
import LogoutButton from "../ui/logout-button"; // Кнопка логаута (создадим ниже)

// Это серверный компонент (по умолчанию) — рендерится на сервере
export default async function ProfilePage() {
  const user = await getUserFromSession(); // Получаем данные пользователя из сессии

  if (!user) {
    // Middleware должен уже перенаправить, но на всякий случай
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "1.125rem" }}>
          Вы не авторизованы.{" "}
          <a
            href="/login"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Войти
          </a>
        </p>
      </main>
    );
  }

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
            marginBottom: "1rem",
          }}
        >
          Добро пожаловать, {user.name}!
        </h1>
        <p style={{ marginBottom: "1.5rem" }}>
          Ваш email: <strong>{user.email}</strong>
        </p>
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.875rem",
            color: "var(--foreground)",
          }}
        >
          Это ваша личная страница.
        </p>
        {/* Кнопка логаута */}
        <LogoutButton />
      </div>
    </main>
  );
}
