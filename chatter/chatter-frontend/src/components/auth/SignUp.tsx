import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";

const SignUp = () => {
  const [createUser] = useCreateUser();

  async function handleSignUp(creds: { email: string; password: string }) {
    const { email, password } = creds;
    await createUser({ variables: { createUserInput: { email, password } } });
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
