import { Edge, Node, EdgeMarker, OnConnect, OnEdgesChange, OnNodesChange, Connection } from 'reactflow'
import { CSSProperties, ReactNode } from 'react'
import Process from './Process'

export interface SelectedEdge {
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
  data?: never;
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
  process: Process;
  setProcess: (process: Process) => void;
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
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void;
  onConnect: OnConnect;
};
