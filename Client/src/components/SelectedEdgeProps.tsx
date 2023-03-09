import React from 'react'
import { Switch } from '@headlessui/react'
import { MarkerType } from 'reactflow'
import EdgeRadioGroup from './EdgeRadioGroup'
import classNames from '../utils/classNames'
import EdgeMarkerTypeRadio from './EdgeMarkerTypeRadio'
import EdgeStrokeSize from './EdgeStrokeSize'

const SelectedEdgeProps = ({
                             edgeProps,
                             animated,
                             setAnimated,
                             markerTypes,
                             strokeWidth,
                             setStrokeWidth,
                             label,
                             setLabel,
                             labelBg,
                             setLabelBg,
                             edgeType,
                             setEdgeType,
                             edgeMarkerType,
                             setEdgeMarkerType
                           }: {
  edgeProps: string[],
  animated: boolean,
  setAnimated: (arg0: boolean) => void,
  markerTypes: MarkerType[],
  strokeWidth: number,
  setStrokeWidth: (arg0: number) => void,
  label: string,
  setLabel: (arg0: string) => void,
  labelBg: string,
  setLabelBg: (arg0: string) => void,
  edgeType: string,
  setEdgeType: (arg0: string) => void,
  edgeMarkerType: MarkerType,
  setEdgeMarkerType: (arg0: MarkerType) => void
}) => (
  <div>
    <EdgeRadioGroup edgeProps={edgeProps} selectedEdgeType={edgeType} setSelectedEdgeType={setEdgeType} />
    <div>
      <Switch
        name='animated'
        checked={animated}
        onChange={setAnimated}
        className={classNames(
          animated ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        )}>
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
)

export default SelectedEdgeProps
