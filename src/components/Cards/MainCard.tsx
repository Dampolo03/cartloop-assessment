import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

interface MainCardProps {
  title?: string;
  titleColor?: string;
  icon?: JSX.Element;
  children?: JSX.Element;
  cardColor: string;
  childrenClassName?: string;
  popOver?: boolean;
  popOverText?: string;
  popOverOnClick?: () => void;
  clickIcon?: () => void;
}

export const MainCard: React.FC<MainCardProps> = ({
  title,
  icon,
  children,
  titleColor,
  cardColor,
  childrenClassName,
  popOver,
  popOverText,
  popOverOnClick,
  clickIcon,
}) => {
  return (
    <Card
      className={"maincard-container-" + childrenClassName}
      style={{ backgroundColor: `${cardColor}` }}
    >
      <CardContent>
        <div className="maincard-typography-container">
          <Typography
            id="title-typography"
            sx={{ fontSize: 16 }}
            color={titleColor}
          >
            {title}
          </Typography>
          {popOver ? (
            <PopupState variant="popover">
              {(popupState: any) => (
                <>
                  <div
                    className={"maincard-icon-container-" + childrenClassName}
                    {...bindTrigger(popupState)}
                  >
                    {icon}
                  </div>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Typography
                      sx={{ p: 2 }}
                      id="typography-popover"
                      onClick={() => {
                        popupState.close();
                        popOverOnClick?.call(null);
                      }}
                    >
                      {popOverText}
                    </Typography>
                  </Popover>
                </>
              )}
            </PopupState>
          ) : (
            <div
              className={"maincard-icon-container-" + childrenClassName}
              onClick={clickIcon}
            >
              {icon}
            </div>
          )}
        </div>
        <div className={"maincard-content-" + childrenClassName}>
          <div className={childrenClassName}>{children}</div>
        </div>
      </CardContent>
    </Card>
  );
};
