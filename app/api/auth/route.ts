import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { username, password, grant_type, client_id } = await req.json();

      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("grant_type", grant_type);
      params.append("client_id", client_id);

      const response = await axios.post(
        "https://lemur-2.cloud-iam.com/auth/realms/lms-app/protocol/openid-connect/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return NextResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error_description ||
          error.response?.statusText ||
          "Ошибка аутентификации";
        return NextResponse.json({ message }, { status: 400 });
      } else {
        return (
          NextResponse.json({ message: "Произошла ошибка сервера" }),
          { status: 500 }
        );
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return NextResponse.json(
      {
        message: `Метод ${req.method} не разрешен`,
      },
      { status: 405 }
    );
  }
}
