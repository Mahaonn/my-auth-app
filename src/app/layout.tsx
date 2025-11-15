import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Auth App",
  description: "Приложение с авторизацией",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header
          style={{
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "var(--header)",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: "var(--foreground)",
            }}
          >
            MyApp
          </Link>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <Link
              href="/signup"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Регистрация
            </Link>
            <Link
              href="/login"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Вход
            </Link>
          </nav>
        </header>

        {children}

        <footer
          style={{
            borderTop: "1px solid #e5e7eb",
            textAlign: "center",
            padding: "1rem",
            fontSize: "0.875rem",
            backgroundColor: "var(--footer)",
            color: "var(--foreground)",
            marginTop: "auto",
          }}
        >
          © 2025 MyApp. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
