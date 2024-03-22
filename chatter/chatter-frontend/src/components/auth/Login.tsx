import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  async function handleLogin(creds: { email: string; password: string }) {
    login(creds);
  }

  return (
    <Auth submitLabel="login" onSubmit={handleLogin} error={error}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Sign Up</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
