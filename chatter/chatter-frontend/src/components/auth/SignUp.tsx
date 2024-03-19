import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";

const SignUp = () => {
  async function handleSignUp(creds: { email: string; password: string }) {
    console.log(creds.email, creds.password);
  }
  return (
    <Auth submitLabel="Sign Up" onSubmit={handleSignUp}>
      <Link to={"/sign-in"} style={{ alignSelf: "center" }}>
        <MUILink>Log in</MUILink>
      </Link>
    </Auth>
  );
};

export default SignUp;
