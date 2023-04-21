import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import axios from 'axios'
import { shallow } from 'zustand/shallow'
import { ReactFlowInstance } from 'reactflow'
import { useFlowStore } from '@/store'
import { RFState } from '@/types/RFState'
import { Model } from '@/types/Model'

const loadModels = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_ENDPOINT + '/api/get-models'
  )
  return data
}

const selector = (state: RFState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setProcess: state.setProcess
})

const LoadModal = ({
  open,
  setOpen,
  reactFlowInstance
}: {
  open: boolean
  setOpen: (arg0: boolean) => void
  reactFlowInstance: ReactFlowInstance | null
}) => {
  const { setNodes, setEdges, setProcess } = useFlowStore(selector, shallow)
  const [models, setModels] = useState<Model[]>([])
  useEffect(() => {
    if (open) loadModels().then((data) => setModels(data))
  }, [open])
  return (
    <Transition.Root show={open}>
      <div className="relative z-10">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Select Modal to Load
                    </h3>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">
                        Pinned Projects
                      </h2>
                      <ul className="mt-3 pt-3 pb-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
                        {models.map((model, index) => (
                          <li
                            key={model.id}
                            className="col-span-1 flex rounded-md shadow-sm"
                          >
                            <div
                              role="button"
                              tabIndex={index}
                              className=" flex h-24 w-fit flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                              onClick={() => {
                                setNodes(model.instance.nodes)
                                setEdges(model.instance.edges)
                                setProcess(model.process)
                                reactFlowInstance?.fitView()
                                reactFlowInstance?.zoomTo(1)
                                setOpen(false)
                              }}
                            >
                              <img
                                className=" shadow hover:shadow-2xl"
                                src={model.fileName}
                                alt=""
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Go back to the Modeler
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  )
}

export default LoadModal
