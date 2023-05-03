import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import State from '@/types/State'
import useStore from '@/store/stateStore'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: State) => ({
  resetState: state.resetState
})
const selector1 = (state: RFState) => ({
  resetState: state.resetState
})

const CreateNew = () => {
  const navigate = useNavigate()
  const { resetState } = useStore(selector, shallow)
  const { resetState: resetFlowState } = useFlowStore(selector1, shallow)

  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => {
        resetState()
        resetFlowState()
        navigate('/modeler')
      }}
    >
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        />
      </svg>
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Create a new Model
      </span>
    </button>
  )
}

export default CreateNew
