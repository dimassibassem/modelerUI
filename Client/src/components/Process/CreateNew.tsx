import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { Icon } from '@iconify/react'
import State from '@/types/store/State'
import useStore from '@/store/stateStore'
import { RFState } from '@/types/store/RFState'
import { useFlowStore } from '@/store'

const selector = (state: State) => ({
  resetState: state.resetState
})
const selector2 = (state: RFState) => ({
  resetState: state.resetState
})

const CreateNew = () => {
  const navigate = useNavigate()
  const { resetState } = useStore(selector, shallow)
  const { resetState: resetFlowState } = useFlowStore(selector2, shallow)

  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => {
        resetState()
        resetFlowState()
        navigate('/modeler')
      }}
    >
      <Icon
        className="mx-auto h-16 w-16 text-gray-400"
        width={100}
        height={100}
        icon="fluent:desktop-flow-20-regular"
      />
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Create a new Bankerise Process
      </span>
    </button>
  )
}

export default CreateNew
