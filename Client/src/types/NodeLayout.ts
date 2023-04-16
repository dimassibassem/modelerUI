enum VerticalLayout {
  TopToBottom = "TB",
  BottomToTop = "BT"
}

enum HorizontalLayout {
  LeftToRight = "LR",
  RightToLeft = "RL"
}

export type Direction = HorizontalLayout | VerticalLayout;

export { VerticalLayout, HorizontalLayout };
