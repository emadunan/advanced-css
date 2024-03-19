import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";

const SignIn = () => {
  async function handleLogin(creds: { email: string; password: string }) {
    console.log(creds.email, creds.password);
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
