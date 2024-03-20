import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

const SignIn = () => {
  const { login, error } = useLogin();

  async function handleLogin(creds: { email: string; password: string }) {
    login(creds);
  }

  return (
    <Auth submitLabel="login" onSubmit={handleLogin}>
      <Link to={"/sign-up"} style={{ alignSelf: "center" }}>
        <MUILink>Sign Up</MUILink>
      </Link>
    </Auth>
  );
};

export default SignIn;
