import React from "react";
import { MainCard } from "../Cards/MainCard";
import { TextCard } from "../Cards/TextCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface ChatScreenProps {
  username: string;
  sideMacrosOpen: boolean;
  messages?: Array<any>;
  handleMacrosToggleClick: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  username,
  sideMacrosOpen,
  messages,
  handleMacrosToggleClick,
}) => {
  const moreIcon = <MoreHorizIcon />;

  const children = (
    <>
      {messages?.map((message) => (
        <TextCard
          key={Math.random()}
          username={message.user}
          texts={message.msg}
          cardColor={username === message.user ? "#ff6600" : "#ffffff"}
          textColor={username === message.user ? "#ffffff" : "#000000"}
          childrenClassName={
            username === message.user
              ? "user-chatscreen-children chatscreen-cards"
              : "other-chatscreen-children chatscreen-cards"
          }
          selectTexts={() => null}
        />
      ))}
    </>
  );

  return (
    <div className="chatscreen-container">
      <MainCard
        title={"In progress"}
        titleColor={"#808080"}
        cardColor={"#F0F0F0"}
        icon={moreIcon}
        childrenClassName="chatscreen-children"
        popOver
        popOverText={sideMacrosOpen ? "Close Macros" : "Open Macros"}
        popOverOnClick={handleMacrosToggleClick}
        children={children}
      />
    </div>
  );
};
