import { Icon } from '@iconify/react'

const EdgeTypes = [
  {
    name: 'straight',
    icon: <Icon className="w-5 h-5" icon="ic:round-horizontal-rule" />
  },
  {
    name: 'smoothstep',
    icon: <Icon className="w-5 h-5" icon="ph:wave-sine-light" />
  },
  { name: 'step', icon: <Icon className="w-5 h-5" icon="ph:wave-square" /> },
  { name: 'default', icon: 'default' }
]

export default EdgeTypes
