import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface TextCardProps {
  texts: string;
  textColor?: string;
  cardColor: string;
  childrenClassName?: string;
  username?: string;
  selectTexts: (value: string) => void;
}

export const TextCard: React.FC<TextCardProps> = ({
  texts,
  textColor,
  cardColor,
  childrenClassName,
  username,
  selectTexts,
}) => {
  return (
    <>
      {username && (
        <div className={"each-username " + childrenClassName}>{username}</div>
      )}
      <Card
        className={"text-card-" + childrenClassName}
        style={{ backgroundColor: cardColor }}
        onClick={() => {
          selectTexts(texts);
        }}
      >
        <CardContent className={childrenClassName}>
          <Typography sx={{ fontSize: 14 }} color={textColor}>
            {texts}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
