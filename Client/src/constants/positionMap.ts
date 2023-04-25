import { Position } from 'reactflow'
import {
  Direction,
  HorizontalLayout,
  PositionMap,
  VerticalLayout
} from '@/types/NodeLayout'

const positionMap: Record<Direction, PositionMap> = {
  [HorizontalLayout.RightToLeft]: {
    right: { target: Position.Right, source: Position.Left },
    top: { target: Position.Top, source: Position.Right },
    bottom: { target: Position.Bottom, source: Position.Right },
    left: { target: Position.Left, source: Position.Right }
  },
  [HorizontalLayout.LeftToRight]: {
    left: { target: Position.Left, source: Position.Right },
    top: { target: Position.Top, source: Position.Left },
    bottom: { target: Position.Bottom, source: Position.Left },
    right: { target: Position.Right, source: Position.Left }
  },
  [VerticalLayout.TopToBottom]: {
    top: { target: Position.Top, source: Position.Bottom },
    left: { target: Position.Left, source: Position.Bottom },
    right: { target: Position.Right, source: Position.Bottom },
    bottom: { target: Position.Bottom, source: Position.Top }
  },
  [VerticalLayout.BottomToTop]: {
    bottom: { target: Position.Bottom, source: Position.Top },
    left: { target: Position.Left, source: Position.Top },
    right: { target: Position.Right, source: Position.Top },
    top: { target: Position.Top, source: Position.Bottom }
  }
}

export default positionMap
