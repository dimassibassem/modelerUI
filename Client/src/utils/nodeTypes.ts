import Policies from '@/components/flowShapes/Policies'
import Execution from '@/components/flowShapes/Execution'
import Provisioners from '@/components/flowShapes/Provisioners'
import Rule from '@/components/flowShapes/Rule'
import Start from '@/components/flowShapes/Start'
import End from '@/components/flowShapes/End'

const nodeTypes = {
  start: Start,
  end: End,
  policies: Policies,
  execution: Execution,
  provisioners: Provisioners,
  rule: Rule
}

export default nodeTypes
