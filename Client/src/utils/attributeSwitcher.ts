const attributeSwitcher = (type: string) => {
  switch (type) {
    case 'diamond':
      return {
        name: '',
        channel: ''
      }
    case 'circle':
      return {
        name: '',
        challenge: '',
        channel: ''
      }
    case 'square':
      return {
        name: '',
        enricher: '',
        channel: ''
      }
    case 'hexagon':
      return {
        name: '',
        channel: ''
      }
      default:
        return {}
  }
}
export default attributeSwitcher
