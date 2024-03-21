import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>("");

  async function login(request: LoginRequest) {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      if (response.status === 401) {
        setError("Credentials are not valid");
      } else {
        setError("Unknown error occured");
      }
      return;
    }

    setError("");
    await client.refetchQueries({ include: "active" });
  }

  return { login, error };
};

export { useLogin };
