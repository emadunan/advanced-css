import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { snackVar } from "../../constants/snack";
import { useReactiveVar } from "@apollo/client";

const AppSnackbar = () => {
  const snack = useReactiveVar(snackVar);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snack?.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack?.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AppSnackbar;
