import { API_URL } from "../constants/urls";

const useLogout = () => {
  async function logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });
  }

  return { logout };
};

export { useLogout };
