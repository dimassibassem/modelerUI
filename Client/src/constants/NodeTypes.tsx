import Policies from '@/components/FlowShapes/Policies'
import Execution from '@/components/FlowShapes/Execution'
import Provisioners from '@/components/FlowShapes/Provisioners'
import Rule from '@/components/FlowShapes/Rule'
import Start from '@/components/FlowShapes/Start'
import End from '@/components/FlowShapes/End'

const NodeTypes = {
  start: Start,
  end: End,
  policies: Policies,
  execution: Execution,
  provisioners: Provisioners,
  rule: Rule
}

export default NodeTypes
