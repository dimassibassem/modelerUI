import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

const BottomLeftCommandsDefinition = ({ type }: { type: string }) => {
  const { t } = useTranslation();
  switch (type) {
    case "Vertical layout":
      return <span className="text-gray-500 pl-2">{t("StartContent")}</span>;
    case "Horizontal layout":
      return <span className="text-gray-500 pl-2">{t("EndContent")}</span>;
    case "Fit View":
      return <span className="text-gray-500 pl-2">{t("FitViewContent")}</span>;
    case "Chain Recovery":
      return <span className="text-gray-500 pl-2">{t("ChainRecoveryContent")}</span>;
    case "Zoom In":
      return <span className="text-gray-500 pl-2">{t("ZoomInContent")}</span>;
    case "Zoom Out":
      return <span className="text-gray-500 pl-2">{t("ZoomOutContent")}</span>;
    case "Full Screen":
      return <span className="text-gray-500 pl-2">{t("FullScreenContent")}</span>;
    default:
      return null;
  }
};

const BottomLeftCommandsIcons = ({ type }: { type: string }) => {
  switch (type) {
    case "Vertical layout":
      return <Icon className="w-5 h-5" icon="material-symbols:swap-vertical-circle-outline-rounded" />
    case "Horizontal layout":
      return   <Icon className="w-5 h-5" icon="material-symbols:swap-horizontal-circle-outline-rounded" />
    case "Fit View":
      return  <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />
    case "Chain Recovery":
      return  <Icon className="w-5 h-5" icon="fa:chain" />
    case "Zoom In":
      return  <MagnifyingGlassPlusIcon className="w-5 h-5" />
    case "Zoom Out":
      return  <MagnifyingGlassMinusIcon className="w-5 h-5" />
    case "Full Screen":
      return  <Icon className="w-5 h-5" icon="solar:full-screen-bold" />

    default:
      return null;
  }

};

export { BottomLeftCommandsDefinition, BottomLeftCommandsIcons };


