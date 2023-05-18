import React from 'react'
import { Node } from 'reactflow'
import { useTranslation } from 'react-i18next'
import capitalize from '@/utils/capitalize'
import channels from '@/constants/channels'

function handleAttributes(
  e: React.ChangeEvent<HTMLInputElement>,
  attribute: string,
  selectedNode: Node | null,
  nodes: Node[],
  setNodes: (arg0: Node[]) => void
) {
  setNodes(
    nodes.map((node) =>
      node.id === selectedNode?.id
        ? {
            ...node,
            data: {
              ...node.data,
              attributes: {
                ...node.data.attributes,
                [attribute]: e.target.value
              }
            }
          }
        : node
    )
  )
}

const Attributes = ({
  attributes,
  setNodes,
  nodes,
  selectedNode
}: {
  attributes: string[]
  setNodes: (arg0: Node[]) => void
  nodes: Node[]
  selectedNode: Node | null
}) => {
  const { t } = useTranslation()
  return (
    <>
      {attributes.map((attribute) => (
        <div className=" my-3 " key={attribute}>
          <label
            htmlFor={attribute}
            className="ml-3 text-sm font-medium text-gray-900"
          >
            {t(attribute)}
          </label>
          {attribute !== 'channel' ? (
            <div>
              <input
                type="text"
                name={attribute}
                id={attribute}
                className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                placeholder={t<string>(`Add a ${capitalize(attribute)}`)}
                value={selectedNode?.data.attributes[attribute]}
                onChange={(e) =>
                  handleAttributes(e, attribute, selectedNode, nodes, setNodes)
                }
              />
            </div>
          ) : (
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <div className="flex gap-3">
                {channels.map((canal) => (
                  <div key={canal} className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id={canal}
                        aria-describedby={canal}
                        name="channel"
                        type="radio"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={canal}
                        onChange={(e) =>
                          handleAttributes(
                            e,
                            attribute,
                            selectedNode,
                            nodes,
                            setNodes
                          )
                        }
                        checked={
                          selectedNode?.data.attributes[attribute] === canal
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={canal}
                        className="font-medium text-gray-900"
                      >
                        {t(canal)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Attributes
