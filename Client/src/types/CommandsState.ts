import { HorizontalLayout, VerticalLayout } from "@/types/NodeLayout";
import ResetState from "@/types/ResetState";

interface CommandsState extends ResetState {
  verticalLayout: VerticalLayout;
  setVerticalLayout: (verticalLayout: VerticalLayout) => void;
  horizontalLayout: HorizontalLayout;
  setHorizontalLayout: (horizontalLayout: HorizontalLayout) => void;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

export default CommandsState;
