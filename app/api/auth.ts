// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Деструктуризация тела запроса
      const { username, password, grant_type, client_id } = req.body;

      // Подготовка данных для запроса
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("grant_type", grant_type);
      params.append("client_id", client_id);

      // Выполнение внешнего запроса к сервису аутентификации
      const response = await axios.post(
        "https://lemur-2.cloud-iam.com/auth/realms/lms-app/protocol/openid-connect/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Отправка ответа клиенту
      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Обработка ошибки, специфичной для Axios
        const message = error.response?.statusText || "Ошибка аутентификации";
        res.status(500).json({ message });
      } else {
        // Обработка других возможных ошибок
        res.status(500).json({ message: "Произошла ошибка сервера" });
      }
    }
  } else {
    // Обработка не POST запросов
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
