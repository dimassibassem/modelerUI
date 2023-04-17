import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

const UndoRedoDefinition = ({ type }: { type: string }) => {
  const { t } = useTranslation();
  switch (type) {
    case "Undo":
      return <span className="text-gray-500 pl-2">{t("StartContent")}</span>;
    case "Redo":
      return <span className="text-gray-500 pl-2">{t("EndContent")}</span>;
    default:
      return null;
  }
};

const UndoRedoIcons = ({ type }: { type: string }) => {
  switch (type) {
    case "Undo":
      return <Icon className="w-5 h-5" icon="material-symbols:undo" />;
    case "Redo":
      return <Icon className="w-5 h-5" icon="material-symbols:undo" hFlip />;
    default:
      return null;
  }

};


export { UndoRedoDefinition, UndoRedoIcons };
