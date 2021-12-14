import React from "react";
import { MainCard } from "../Cards/MainCard";
import { TextCard } from "../Cards/TextCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { macrosData } from "../../helpers/macrosData";

interface MacrosProps {
  drawerClass: string;
  sideMacrosOpen: boolean;
  handleMacrosToggleClick: () => void;
  handleMacrosSelect: (value: string) => void;
}

export const Macros: React.FC<MacrosProps> = ({
  drawerClass,
  handleMacrosToggleClick,
  sideMacrosOpen,
  handleMacrosSelect,
}) => {
  let containerClass = "macros-container closed";

  if (sideMacrosOpen) {
    containerClass = "macros-container";
  }

  const children = (
    <>
      {macrosData.map((each) => (
        <TextCard
          key={Math.random()}
          texts={each.title}
          cardColor={"#ffffff"}
          childrenClassName="macros-children"
          selectTexts={handleMacrosSelect}
        />
      ))}
    </>
  );

  const dropdownIcon = <ArrowBackIosIcon className="dropdown-icon" />;

  return (
    <div className={containerClass}>
      <MainCard
        title={"Macros"}
        children={children}
        cardColor={"#F0F0F0"}
        icon={dropdownIcon}
        childrenClassName={drawerClass}
        clickIcon={handleMacrosToggleClick}
      />
    </div>
  );
};
