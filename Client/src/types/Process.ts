
type Steps = {
  id: string,
  type: string,
  attributes?: {
    name?: string,
    channel?: string,
    challenge?: string,
    enricher?: string
  }
}[]

type Process = {
  steps: Steps[],
  name: string,
  description: string,
  hook: {
    name: string,
    channel: string,
    isAsync: boolean
  }
}

export default Process
