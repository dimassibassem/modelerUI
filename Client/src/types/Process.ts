type Process = {
  steps: never[],
  name: string,
  description: string,
  hook: {
    name: string,
    channel: string,
    isAsync: boolean
  }
}

export default Process
