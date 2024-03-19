import { Button, Stack, TextField } from "@mui/material";
import { FC, ReactNode, useState } from "react";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: ReactNode;
}

const Auth: FC<AuthProps> = ({ submitLabel, onSubmit, children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
