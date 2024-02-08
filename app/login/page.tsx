"use client";

import React, { useState } from "react";
import axios from "axios";

// Определяем тип для состояния формы
interface FormState {
  username: string;
  password: string;
}

export default function Login() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    try {
      // Отправляем запрос на ваш API роут с использованием axios
      const response = await axios.post("/api/auth", {
        ...formState,
        grant_type: "password", // Предполагаем, что grant_type и client_id статичны
        client_id: "hasura",
      });

      console.log("Успешная аутентификация:", response.data);
      // Обработка успешной аутентификации, например, сохранение токена или переадресация
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Ошибка во время аутентификации:", error.message);
      } else {
        console.error("Ошибка:", error);
      }
      // Обработка ошибок аутентификации
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            value={formState.username}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
