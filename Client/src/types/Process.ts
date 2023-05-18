import Channel from '@/types/Channel'

type Stage = {
  id: string
  type: string
  attributes: {
    [key: string]: string | undefined // add index signature
    name: string
    channel: string
    challenge?: string
    enricher?: string
  }
}

type Process = {
  steps: Stage[]
  processKey: string
  description: string
  channels: Channel[]
  hook: {
    name: string
    isAsync: boolean
  }
}

export default Process
