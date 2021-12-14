import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  SyntheticEvent,
} from "react";
import { ChatScreen } from "../../components/ChatScreen/ChatScreen";
import { Macros } from "../../components/Macros/Macros";
import { InputField } from "../../components/InputField/InputField";
import { LoginModal } from "../../components/LoginModal/LoginModal";
import { SnackbarComponent } from "../../components/Snackbar/SnackbarComponent";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { messagePattern } from "../../utils/constants";

const client = new W3CWebSocket(
  `${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}`
);

export const HomePage = () => {
  const [text, setText] = useState<string>("");
  const [sideMacrosOpen, setSideMacrosOpen] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [welcome, setWelcome] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!username) {
      setLoggedIn(false);
      setOpenModal(true);
    }
  }, [username]);

  useEffect(() => {
    if (loggedIn) {
      setWelcome(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      client.onmessage = (message: any) => {
        const dataFromServer: any = JSON.parse(message.data);
        if (dataFromServer.type === "message") {
          setMessages((oldArray) => [...oldArray, dataFromServer]);
        }
      };
    }
  }, [username, text, loggedIn]);

  const handleEmojisClick = useCallback(
    (event: any, emojiObject: any) => {
      setText(text + emojiObject.emoji);
    },
    [text]
  );

  const sendMessage = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        if (messagePattern.test(text)) {
          client.send(
            JSON.stringify({
              type: "message",
              msg: text,
              user: username,
            })
          );
          setText("");
        } else {
          setTextError(true);
        }
      }
    },
    [text, username]
  );

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    []
  );

  const handleMacrosSelect = useCallback((value) => {
    setText(value);
  }, []);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
    []
  );

  const handleModalClose = useCallback(() => {
    if (username) {
      setOpenModal(false);
      setLoggedIn(true);
    }
  }, [username]);

  const handleMacrosToggleClick = useCallback(() => {
    setSideMacrosOpen(!sideMacrosOpen);
  }, [sideMacrosOpen]);

  let homepageClass = "";

  if (!sideMacrosOpen) {
    homepageClass = "macros-closed";
  }

  let drawerClass = "macros-children";

  if (sideMacrosOpen) {
    drawerClass = "macros-children open";
  }

  return (
    <div className={"homepage-container " + homepageClass}>
      <ChatScreen
        username={username}
        handleMacrosToggleClick={handleMacrosToggleClick}
        messages={messages}
        sideMacrosOpen={sideMacrosOpen}
      />
      <Macros
        drawerClass={drawerClass}
        handleMacrosToggleClick={handleMacrosToggleClick}
        sideMacrosOpen={sideMacrosOpen}
        handleMacrosSelect={handleMacrosSelect}
      />
      <InputField
        text={text}
        handleTextChange={handleTextChange}
        handleEmojisClick={handleEmojisClick}
        sendMessage={sendMessage}
      />
      <LoginModal
        openModal={openModal}
        handleModalClose={handleModalClose}
        username={username}
        handleUsernameChange={handleUsernameChange}
      />
      {welcome && (
        <SnackbarComponent
          snackbarDuration={3000}
          snackbarMessage={`Welcome ${username}!`}
          openSnackbar={welcome}
          closeSnackbar={(event: SyntheticEvent | Event, reason?: string) => {
            if (reason === "clickaway") {
              return;
            }
            setWelcome(false);
          }}
        />
      )}
      {textError && (
        <SnackbarComponent
          snackbarDuration={5000}
          snackbarMessage={
            "Invalid characters - use alphabets, numbers and symbols -=.,"
          }
          openSnackbar={textError}
          closeSnackbar={(event: SyntheticEvent | Event, reason?: string) => {
            if (reason === "clickaway") {
              return;
            }
            setTextError(false);
          }}
        />
      )}
    </div>
  );
};
