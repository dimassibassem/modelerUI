const connectableWith = (type: string) => {
  switch (type) {
    case 'start':
      return ['end', 'diamond', 'trapezoid', 'hexagon', 'circle', 'square']
    case 'end':
      return ['start', 'diamond', 'trapezoid', 'hexagon', 'circle', 'square']
    case 'diamond':
      return ['end', 'trapezoid', 'hexagon', 'circle', 'square']
    case 'trapezoid':
      return ['start', 'end', 'hexagon', 'circle', 'square']
    case 'hexagon':
      return ['start', 'end', 'hexagon', 'circle', 'square']
    case 'circle':
      return ['start', 'end', 'hexagon', 'square']
    case 'square':
      return ['start', 'end', 'diamond', 'square']
    default:
      return ['start', 'end', 'diamond', 'trapezoid', 'hexagon', 'circle', 'square']
  }
}
export default connectableWith
