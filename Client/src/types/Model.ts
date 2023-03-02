import {Edge,Node} from "reactflow";

export type Model = {
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

