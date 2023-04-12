import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { Edge, EdgeMarker, MarkerType } from 'reactflow'
import { shallow } from 'zustand/shallow'
import EdgeRadioGroup from './EdgeRadioGroup'
import classNames from '@/utils/classNames'
import EdgeMarkerTypeRadio from './EdgeMarkerTypeRadio'
import EdgeStrokeSize from './EdgeStrokeSize'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'

const selector = (state: RFState) => ({
  selected: state.selected as Edge,
  edges: state.edges,
  setEdges: state.setEdges
})

const SelectedEdgeProps = () => {
  const { selected, edges, setEdges } = useFlowStore(selector, shallow)
  const [type, setType] = useState(selected?.type || 'default')
  const [animated, setAnimated] = useState(selected?.animated || false)
  const [edgeMarkerType, setEdgeMarkerType] = useState(
    (selected?.markerEnd as EdgeMarker).type || MarkerType.Arrow
  )
  const [strokeWidth, setStrokeWidth] = useState(
    Number(selected?.style?.strokeWidth) || 1
  )
  const [label, setLabel] = useState(selected?.label || '')
  const [labelBg, setLabelBg] = useState(
    selected?.labelBgStyle?.fill || '#ffffff'
  )

  useEffect(() => {
    if (selected) {
      setEdges(
        edges.map((edge) =>
          edge.id === selected.id
            ? {
                ...edge,
                type,
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
              }
            : edge
        )
      )
    }
  }, [animated, edgeMarkerType, label, labelBg, setEdges, strokeWidth, type])

  useEffect(() => {
    setType(selected?.type || 'default')
    setAnimated(selected?.animated || false)
    setEdgeMarkerType(
      (selected?.markerEnd as EdgeMarker).type || MarkerType.Arrow
    )
    setStrokeWidth(Number(selected?.style?.strokeWidth) || 1)
    setLabel(selected?.label || '')
    setLabelBg(selected?.labelBgStyle?.fill || '#ffffff')
  }, [selected])

  return (
    <div>
      <EdgeRadioGroup edgeType={type} setEdgeType={setType} />
      <div>
        <Switch
          name="animated"
          checked={animated}
          onChange={() => setAnimated(!animated)}
          className={classNames(
            animated ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              animated ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        <label
          htmlFor="animated"
          className="ml-3 text-sm font-medium text-gray-900"
        >
          Animated
        </label>
      </div>
      <EdgeMarkerTypeRadio
        edgeMarkerType={edgeMarkerType}
        setEdgeMarkerType={setEdgeMarkerType}
      />
      <EdgeStrokeSize
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
      />
      <label htmlFor="label" className="ml-3 text-sm font-medium text-gray-900">
        Label
      </label>
      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          id="label"
          className="block p-1 w-full col-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder="Add a Label"
          value={label ? String(label) : ''}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          type="color"
          className="p-1 px-1 h-full w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
          value={labelBg}
          onChange={(e) => setLabelBg(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SelectedEdgeProps
