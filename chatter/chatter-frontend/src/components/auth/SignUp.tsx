import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";
import { useState } from "react";

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");

  async function handleSignUp(creds: { email: string; password: string }) {
    try {
      const { email, password } = creds;
      await createUser({ variables: { createUserInput: { email, password } } });
      setError("");
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setError("Unknown error occured.");
    }
  }

  return (
    <Auth submitLabel="Sign Up" onSubmit={handleSignUp} error={error}>
      <Link to={"/sign-in"} style={{ alignSelf: "center" }}>
        <MUILink>Log in</MUILink>
      </Link>
    </Auth>
  );
};

export default SignUp;
