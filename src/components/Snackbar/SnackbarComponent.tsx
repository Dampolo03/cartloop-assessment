import React, { SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

interface SnackbarProps {
  openSnackbar: boolean;
  snackbarDuration: number;
  snackbarAction?: JSX.Element;
  snackbarMessage: string | JSX.Element;
  closeSnackbar: (
    event: SyntheticEvent | Event,
    reason?: string | undefined
  ) => void;
}

export const SnackbarComponent: React.FC<SnackbarProps> = ({
  openSnackbar,
  snackbarDuration,
  snackbarAction,
  snackbarMessage,
  closeSnackbar,
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={snackbarDuration}
      onClose={closeSnackbar}
      action={snackbarAction}
    >
      <SnackbarContent
        style={{
          backgroundColor: "#ff6600",
        }}
        message={snackbarMessage}
      />
    </Snackbar>
  );
};
