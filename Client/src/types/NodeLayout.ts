import { Position } from 'reactflow'

enum VerticalLayout {
  TopToBottom = 'TB',
  BottomToTop = 'BT'
}

enum HorizontalLayout {
  LeftToRight = 'LR',
  RightToLeft = 'RL'
}

export type PositionMap = Record<string, { target: Position; source: Position }>

export type Direction = HorizontalLayout | VerticalLayout

export { VerticalLayout, HorizontalLayout }
