import Diamond from '../components/flowShapes/Diamond'
import Trapezoid from '../components/flowShapes/Trapezoid'
import Parallelogram from '../components/flowShapes/Parallelogram'
import Circle from '../components/flowShapes/Circle'
import Oval from '../components/flowShapes/Oval'
import Square from '../components/flowShapes/Square'
import Start from '../components/flowShapes/Start'
import End from '../components/flowShapes/End'

const nodeTypes = {
  start: Start,
  end: End,
  diamond: Diamond,
  trapezoid: Trapezoid,
  parallelogram: Parallelogram,
  circle: Circle,
  oval: Oval,
  square: Square
}

export default nodeTypes
