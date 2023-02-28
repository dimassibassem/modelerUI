import { shallow } from 'zustand/shallow'
import { RFState } from '../types/RFState'
import useStore from '../store'

const RightSidebar = () => {
  const selector = (state: RFState) => ({
    selectedNode: state.selectedNode,
    selectedEdge: state.selectedEdge
  })
  const { selectedNode, selectedEdge } = useStore(selector, shallow)
  return (
    <aside
      className='hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block overscroll-auto hover:overscroll-contain h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent sticky'>
      {/*  infos */}
      <div>
        <div className='mt-4 flex items-start justify-between'>
          <div>
            <h2 className='text-lg font-medium text-gray-900'>
              <span className='sr-only'>Details for </span>
              selectedNode: {selectedNode ? selectedNode.id : 'nothing'}
            </h2>
            <p
              className='text-sm font-medium text-gray-500'>selectedEdge: {selectedEdge ? selectedEdge.id : 'nothing'}</p>
          </div>
          <button
            type='button'
            className='ml-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-gray-400 hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-white'
          >
            {/*<HeartIconSolid className='h-8 w-8 text-red-300' aria-hidden='true' />*/}
            {/*<HeartIconSolid className='h-8 w-8 text-red-600 ' aria-hidden='true' />*/}
            <span className='sr-only'>Favorite</span>
          </button>
        </div>
        <p className='text-sm font-medium text-gray-500 pt-3 text-right'>.........</p>
      </div>
      {/*  more informations */}
      <div>
        <div>
          <h3 className='font-medium text-gray-900'>Information</h3>
          <dl className='mt-2 border-t border-b border-gray-200 divide-y divide-gray-200'>

            <div className='py-3 flex justify-between text-sm font-medium'>
              <dt className='text-gray-500'>Category</dt>
              <dd className='text-gray-900'>value</dd>
            </div>

            <div className='py-3 flex justify-between text-sm font-medium'>
              <dt className='text-gray-500'>Location</dt>
              <dd className='text-gray-900'>value2</dd>
            </div>
            <div className='py-3 flex justify-between text-sm font-medium'>
              <dt className='text-gray-500'>Posted at</dt>
              <dd className='text-gray-900'>value3</dd>
            </div>
          </dl>
        </div>
        <div className='pt-3'>
          <h3 className='font-medium text-gray-900'>Description</h3>
          <dl className='mt-2 border-t border-b border-gray-200 divide-y divide-gray-200'>
            <div className='py-3 flex justify-between text-sm font-medium'>

              <dd className='text-gray-500'>value 4</dd>
            </div>
          </dl>
        </div>
      </div>
    </aside>
  )

}
export default RightSidebar
