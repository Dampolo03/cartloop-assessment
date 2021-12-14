import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { customModalStyle } from "../../helpers/customStyle";

interface LoginModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  username?: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  openModal,
  handleModalClose,
  username,
  handleUsernameChange,
}) => {
  const enterPressed = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleModalClose();
    }
  };

  return (
    <Modal open={openModal} id="login-modal">
      <Box sx={customModalStyle} id="login-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Hi! Welcome to Cartloop.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please input a username to start chatting.
        </Typography>
        <TextField
          label="Username"
          placeholder="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          onKeyUp={enterPressed}
        />
        <Button
          id="login-button"
          variant="contained"
          onClick={handleModalClose}
        >
          Login
        </Button>
      </Box>
    </Modal>
  );
};
