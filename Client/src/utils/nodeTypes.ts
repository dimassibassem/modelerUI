import Diamond from '../components/flowShapes/Diamond'
import Trapezoid from '../components/flowShapes/Trapezoid'
import Hexagon from '../components/flowShapes/Hexagon'
import Circle from '../components/flowShapes/Circle'
import Square from '../components/flowShapes/Square'
import Start from '../components/flowShapes/Start'
import End from '../components/flowShapes/End'

const nodeTypes = {
  start: Start,
  end: End,
  diamond: Diamond,
  trapezoid: Trapezoid,
  hexagon: Hexagon,
  circle: Circle,
  square: Square
}

export default nodeTypes
