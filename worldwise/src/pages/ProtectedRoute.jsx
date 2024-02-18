import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/FakeAuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}
