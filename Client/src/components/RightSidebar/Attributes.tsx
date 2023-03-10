import React from 'react'
import { Node } from 'reactflow'

const Attributes = ({ attributes, setNodes, nodes, selectedNode }:
                      {
                        attributes: string[],
                        setNodes: (arg0: Node[]) => void,
                        nodes: Node[],
                        selectedNode: Node | null
                      }
) =>
  <>
    {attributes.map((attribute) => (
        <div className=' mt-3 ' key={attribute}>
          <label htmlFor={attribute}
                 className='ml-3 text-sm font-medium text-gray-900'>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</label>
          <div>
            <input
              type='text'
              name={attribute}
              id={attribute}
              className='block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
              placeholder={`Add a ${attribute.charAt(0).toUpperCase() + attribute.slice(1)}`}
              value={selectedNode?.data.attributes[attribute]}
              onChange={(e) => {
                setNodes(nodes.map(node => node.id === selectedNode?.id ? {
                  ...node,
                  data: {
                    ...node.data,
                    attributes: {
                      ...node.data.attributes,
                      [attribute]: e.target.value
                    }
                  }
                } : node))
              }
              }
            />
          </div>
        </div>
      )
    )
    }
  </>


export default Attributes
