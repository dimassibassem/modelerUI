import { Edge, Node,EdgeMarker, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { CSSProperties, ReactNode } from 'react'

interface SelectedEdge {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  style?: CSSProperties;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  data?: any;
  className?: string;
  sourceNode?: Node;
  targetNode?: Node;
  selected?: boolean;
  markerStart?: EdgeMarker;
  markerEnd?: EdgeMarker;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  focusable?: boolean;
  label?: string | ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
}

export type RFState = {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  selectedEdge: SelectedEdge | null ;
  setSelectedEdge: (edge: Edge | null) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};
