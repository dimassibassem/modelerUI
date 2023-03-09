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
import SelectedEdgeProps from './SelectedEdgeProps'
import SelectedNodeProps from './SelectedNodeProps'

const edgeProps = ['straight', 'smoothstep', 'step', 'default']
const markerTypes = [MarkerType.Arrow, MarkerType.ArrowClosed]

const RightSidebar = () => {
  const selector = (state: RFState) => ({
    selectedNode: state.selectedNode,
    selectedEdge: state.selectedEdge,
    nodes: state.nodes,
    edges: state.edges,
    setEdges: state.setEdges,
    setNodes: state.setNodes
  })
  const { selectedNode, selectedEdge, edges, setEdges, setNodes, nodes } = useStore(selector, shallow)
  const [edgeType, setEdgeType] = useState(selectedEdge?.type || 'default')
  const [animated, setAnimated] = useState(false)
  const [edgeMarkerType, setEdgeMarkerType] = useState(MarkerType.Arrow)
  const [strokeWidth, setStrokeWidth] = useState(1)
  const [label, setLabel] = useState('')
  const [labelBg, setLabelBg] = useState('#ffffff')
  const [nodeText, setNodeText] = useState('')
// todo : this need to be refactored and check memory leak

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
    if (selectedNode) {
      setNodes(nodes.map(node => node.id === selectedNode.id ? {
        ...node,
        data: {
          text: nodeText
        }
      } : node))
    }
  }, [nodeText])

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

  useEffect(() => {
    if (selectedNode) {
      const node = nodes.find(nod => nod.id === selectedNode.id)
      setNodeText(node?.data?.text || '')
    }
  }, [selectedNode])

  return (
    <aside
      className='hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block overscroll-auto hover:overscroll-contain h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent sticky'>
      {selectedEdge &&
        <SelectedEdgeProps animated edgeProps={edgeProps} label={label} labelBg={labelBg} markerTypes={markerTypes}
                           setAnimated={setAnimated} setLabel={setLabel} setLabelBg={setLabelBg}
                           setStrokeWidth={setStrokeWidth} strokeWidth={strokeWidth} edgeType={edgeType}
                           setEdgeType={setEdgeType} edgeMarkerType={edgeMarkerType}
                           setEdgeMarkerType={setEdgeMarkerType} />
      }
      {selectedNode && <SelectedNodeProps nodeText={nodeText} setNodeText={setNodeText} />
      }

    </aside>
  )

}
export default RightSidebar
