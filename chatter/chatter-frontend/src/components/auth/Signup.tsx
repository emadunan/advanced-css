import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Auth from "./Auth";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/error";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");
  const { login } = useLogin();

  async function handleSignup(creds: { email: string; password: string }) {
    try {
      const { email, password } = creds;
      await createUser({ variables: { createUserInput: { email, password } } });
      setError("");
      login({ email, password });
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setError(UNKNOWN_ERROR_MESSAGE);
    }
  }

  return (
    <Auth submitLabel="Sign Up" onSubmit={handleSignup} error={error}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Log in</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
