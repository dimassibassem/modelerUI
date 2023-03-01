import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import axios from 'axios'
import { Edge } from 'reactflow'


const loadModels = async () => {
  const { data } = await axios.get('http://localhost:3001/api/get-models')
  return data
}
type Model = {
  id: number
  fileName: string
  dataURI: string
  instance: {
    nodes: Node[]
    edges: Edge[]
    viewport: {
      x: number
      y: number
      zoom: number
    }
  }
}

const LoadModal = () => {
  const [open, setOpen] = useState(true)
  const [models, setModels] = useState<Model[]>([])
  useEffect(() => {
    loadModels().then((data) => setModels(data)
    )
  }, [])
  return (
    <Transition.Root show={open} as={Fragment}>
      <div className='relative z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div
                className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <h3 className='text-base font-semibold leading-6 text-gray-900'>
                      Select Modal to Load
                    </h3>
                    <div>
                      <h2 className='text-sm font-medium text-gray-500'>Pinned Projects</h2>
                      <ul
                        className='mt-3 pt-3 pb-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2'>
                        {models.map((model) => (
                          <li key={model.id} className='col-span-1 flex rounded-md shadow-sm'>
                            <div
                              className=' flex h-24 w-fit flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                            >
                              <img className=' shadow hover:shadow-2xl' src={model.fileName} alt='' />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
                  >
                    Go back to dashboard
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
