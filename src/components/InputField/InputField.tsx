import React, { useRef, useState, SyntheticEvent } from "react";
import { MainCard } from "../Cards/MainCard";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Button from "@mui/material/Button";
import Picker from "emoji-picker-react";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { SnackbarComponent } from "../Snackbar/SnackbarComponent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface InputFieldProps {
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmojisClick: (
    { firstParameter }: any,
    { secondParameter }: any
  ) => void;
  sendMessage: (event: React.KeyboardEvent) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  text,
  handleTextChange,
  handleEmojisClick,
  sendMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const snackbarHandleClick = () => {
    setOpenSnackbar(true);
  };

  const closeSnackbar = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const snackbarAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const uploadFile = (e: any) => {
    e.preventDefault();
    fileInputRef?.current?.click();
  };

  const textBox = (
    <>
      <div className="textfield-container">
        <TextField
          variant="standard"
          placeholder="Enter message"
          fullWidth
          value={text}
          onChange={handleTextChange}
          onKeyUp={sendMessage}
        />
      </div>
      <div className="icons-and-button-container">
        <div className="icons-container">
          <div className="add-icon-container">
            <AddIcon className="add-icon" />
          </div>
          <AttachFileIcon className="attach-file-icon" onClick={uploadFile} />
          <input
            className="ref-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
          />
          <PopupState variant="popover">
            {(popupState: any) => (
              <>
                <EmojiEmotionsIcon
                  className="emoji-emotions-icon"
                  {...bindTrigger(popupState)}
                />
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Picker
                    onEmojiClick={handleEmojisClick}
                    pickerStyle={{ width: "100%" }}
                  />
                </Popover>
              </>
            )}
          </PopupState>
        </div>
        <div>
          <Button
            id="resolve-button"
            variant="contained"
            onClick={snackbarHandleClick}
          >
            Resolve
          </Button>
          <SnackbarComponent
            snackbarDuration={5000}
            snackbarAction={snackbarAction}
            snackbarMessage={
              <span className="snackbar-message-container">
                <div className="snackbar-message">Issue resolved</div>{" "}
                <CheckCircleIcon />
              </span>
            }
            openSnackbar={openSnackbar}
            closeSnackbar={closeSnackbar}
          />
        </div>
      </div>
    </>
  );

  const inputfield = <MainCard cardColor={"white"} children={textBox} />;

  return (
    <div className="inputfield-container">
      <MainCard
        children={inputfield}
        cardColor={"#F0F0F0"}
        childrenClassName="inputfield-children"
      />
    </div>
  );
};
