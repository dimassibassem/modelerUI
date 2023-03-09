import { shallow } from 'zustand/shallow'
import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { MarkerType } from 'reactflow'
import { RFState } from '../types/RFState'
import useStore from '../store'
import EdgeRadioGroup from './EdgeRadioGroup'
import EdgeMarkerTypeRadio from './EdgeMarkerTypeRadio'
import classNames from '../utils/classNames'
import EdgeStrokeSize from './EdgeStrokeSize'

const edgeProps = ['straight', 'smoothstep', 'step', 'default']
const markerTypes = [MarkerType.Arrow, MarkerType.ArrowClosed]

const RightSidebar = () => {
  const selector = (state: RFState) => ({
    selectedNode: state.selectedNode,
    selectedEdge: state.selectedEdge,
    edges: state.edges,
    setEdges: state.setEdges
  })
  const { selectedNode, selectedEdge, edges, setEdges } = useStore(selector, shallow)
  const [edgeType, setEdgeType] = useState(selectedEdge?.type || 'default')
  const [animated, setAnimated] = useState(false)
  const [edgeMarkerType, setEdgeMarkerType] = useState(MarkerType.Arrow)
  const [strokeWidth, setStrokeWidth] = useState(1)
  const [label, setLabel] = useState('')
  const [labelBg, setLabelBg] = useState('#ffffff')

  useEffect(() => {
    if (selectedEdge) {
      setEdges(edges.map(edge => edge.id === selectedEdge.id ? {
        ...edge,
        type: edgeType,
        animated,
        label,
        labelBgStyle: {
          fill: labelBg
        },
        markerEnd: {
          type: edgeMarkerType,
          width: strokeWidth * 8,
          height: strokeWidth * 8
        },
        style: {
          strokeWidth
        }
      } : edge))
    }
  }, [edgeType, animated, edgeMarkerType, strokeWidth, label, labelBg])

  useEffect(() => {
    if (selectedEdge) {
      const edge = edges.find(edg => edg.id === selectedEdge.id)
      setEdgeType(edge?.type || 'default')
      setAnimated(edge?.animated || false)
      setEdgeMarkerType(edge?.markerEnd?.type || MarkerType.Arrow)
      setStrokeWidth(edge?.style?.strokeWidth || 1)
      setLabel(edge?.label || '')
      setLabelBg(edge?.labelBgStyle?.fill || '#ffffff')
    }
  }, [selectedEdge])

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
        </div>
      </div>
      {selectedEdge && <div>
        <EdgeRadioGroup edgeProps={edgeProps} selectedEdgeType={edgeType} setSelectedEdgeType={setEdgeType} />
        <div>
          <Switch
            name='animated'
            checked={animated}
            onChange={setAnimated}
            className={classNames(
              animated ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
          >
            <span
              aria-hidden='true'
              className={classNames(
                animated ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
          <label htmlFor='animated' className='ml-3 text-sm font-medium text-gray-900'>Animated</label>
        </div>
        <EdgeMarkerTypeRadio markerTypes={markerTypes} selectedEdgeMarkerType={edgeMarkerType}
                             setSelectedEdgeMarkerType={setEdgeMarkerType} />
        <EdgeStrokeSize edgeSize={strokeWidth} setEdgeSize={setStrokeWidth} />
        <label htmlFor='label' className='ml-3 text-sm font-medium text-gray-900'>Label</label>
        <div className='grid grid-cols-4 gap-4'>
          <input
            type='label'
            name='label'
            id='label'
            className='block p-1 w-full col-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
            placeholder='Add a Label'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <input type='color'
                 className='p-1 px-1 h-full w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 '
                 value={labelBg}
                 onChange={(e) => setLabelBg(e.target.value)}
          />
        </div>
      </div>
      }
      {/*  more informations */}
      {/* <div> */}
      {/*  <div> */}
      {/*    <h3 className='font-medium text-gray-900'>Information</h3> */}
      {/*    <dl className='mt-2 border-t border-b border-gray-200 divide-y divide-gray-200'> */}

      {/*      <div className='py-3 flex justify-between text-sm font-medium'> */}
      {/*        <dt className='text-gray-500'>Location</dt> */}
      {/*        <dd className='text-gray-900'>value2</dd> */}
      {/*      </div> */}
      {/*      <div className='py-3 flex justify-between text-sm font-medium'> */}
      {/*        <dt className='text-gray-500'>Posted at</dt> */}
      {/*        <dd className='text-gray-900'>value3</dd> */}
      {/*      </div> */}
      {/*    </dl> */}
      {/*  </div> */}
      {/*  <div className='pt-3'> */}
      {/*    <h3 className='font-medium text-gray-900'>Description</h3> */}
      {/*    <dl className='mt-2 border-t border-b border-gray-200 divide-y divide-gray-200'> */}
      {/*      <div className='py-3 flex justify-between text-sm font-medium'> */}

      {/*        <dd className='text-gray-500'>value 4</dd> */}
      {/*      </div> */}
      {/*    </dl> */}
      {/*  </div> */}
      {/* </div> */}
    </aside>
  )

}
export default RightSidebar
