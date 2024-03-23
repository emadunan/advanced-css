import { API_URL } from "../constants/urls";

const useLogout = () => {
  async function logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Error logging out.")
    }
  }

  return { logout };
};

export { useLogout };
