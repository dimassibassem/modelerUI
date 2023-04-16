import React from 'react'
import { Step } from 'react-joyride'
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import NodeType from '@/types/NodeType'
import capitalize from '@/utils/capitalize'
import IconSwitcher from '@/components/LeftSidebar/IconSwitcher'
import DefinitionSwitcher from '@/components/Joyride/DefinitionSwitcher'

const shapes = [
  NodeType.Start,
  NodeType.End,
  NodeType.Policies,
  NodeType.Execution,
  NodeType.Provisioners,
  NodeType.Rule
]

type ListWithProps = {
  name: string
  icon: JSX.Element
}

const undoRedoList = [
  {
    name: 'Undo',
    icon: <Icon className="w-5 h-5" icon="material-symbols:undo" />
  },
  {
    name: 'Redo',
    icon: <Icon className="w-5 h-5" icon="material-symbols:undo" hFlip />
  }
]

const bottomLeftCommands = [
  {
    name: 'Vertical layout',
    icon: (
      <Icon
        className="w-5 h-5"
        icon="material-symbols:swap-vertical-circle-outline-rounded"
      />
    )
  },
  {
    name: 'Horizontal layout',
    icon: (
      <Icon
        className="w-5 h-5"
        icon="material-symbols:swap-horizontal-circle-outline-rounded"
      />
    )
  },
  {
    name: 'Fit View',
    icon: <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />
  },
  {
    name: 'Chain Recovery',
    icon: <Icon className="w-5 h-5" icon="fa:chain" />
  },
  {
    name: 'Zoom In',
    icon: <MagnifyingGlassPlusIcon className="w-5 h-5" />
  },
  {
    name: 'Zoom Out',
    icon: <MagnifyingGlassMinusIcon className="w-5 h-5" />
  },
  {
    name: 'Full Screen',
    icon: <Icon className="w-5 h-5" icon="solar:full-screen-bold" />
  }
]

const topRightCommands = [
  {
    name: 'Clear',
    icon: <Icon className="w-5 h-5" icon="ic:outline-clear" />
  },
  {
    name: 'Save',
    icon: (
      <Icon className="w-5 h-5" icon="material-symbols:save-outline-rounded" />
    )
  },
  {
    name: 'Import',
    icon: <Icon className="w-5 h-5" icon="uil:import" />
  }
]

const ListWithIcons = ({ array }: { array: ListWithProps[] }) => {
  const { t } = useTranslation()
  return (
    <ul className="mt-3 grid grid-cols-1 gap-1 gap-y-2">
      {array.map((item) => (
        <li
          key={item.name}
          className="col-span-1 flex rounded-md border shadow-md"
        >
          <div className="flex flex-shrink-0 items-center justify-center p-2">
            {item.icon}
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className=" p-2 text-sm">{t(item.name)}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}
const joyrideSteps = (t = (text: string) => text): Step[] => [
  {
    content: <p>{t('Tour')}</p>,
    placement: 'center',
    target: 'body',
    title: <p className="text-indigo-600">{t('Welcome')}</p>
  },
  {
    content: <p>{t('ProcessName')}</p>,
    placement: 'right',
    target: '#process-modal',
    title: <p className="text-indigo-600">{t('ProcessDefinition')}</p>
  },
  {
    content: <p>{t('Elements')}</p>,
    placement: 'right',
    target: '#left-sidebar',
    title: <p className="text-indigo-600">{t('Left Sidebar')}</p>
  },
  {
    content: (
      <div>
        <p>{t('DraggableElements')}</p>
        <div>
          <div>
            <ul className="mt-3 grid grid-cols-1 gap-2 ">
              {shapes.map((shape) => (
                <li
                  key={shape}
                  className="col-span-1 flex rounded-md shadow-md"
                >
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <IconSwitcher node={shape} />
                  </div>
                  <div className=" flex border-gray-200 ">
                    <div className=" px-4 py-2 text-sm ">
                      <p className="font-medium text-gray-900 ">
                        {capitalize(t(shape))}
                        <DefinitionSwitcher type={shape} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    styles: {
      tooltipTitle: {
        textAlign: 'center'
      },
      tooltipContainer: {
        textAlign: 'left'
      },
      options: {
        width: 400
      }
    },
    placement: 'right',
    target: '#shapes',
    title: <p className="text-indigo-600 ">{t('Shapes')}</p>
  },
  {
    content: <p>{t('DropLocation')}</p>,
    placement: 'top',
    target: '#reactflow-wrapper',
    styles: {
      spotlight: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }
    },
    title: <p className="text-indigo-600">Flow</p>
  },
  {
    content: (
      <div>
        <p>{t('Undo/Redo')}</p>
        <div>
          <ListWithIcons array={undoRedoList} />
        </div>
      </div>
    ),
    placement: 'left',
    target: '#top-left',
    title: <p className="text-indigo-600">{`${t('Undo')} / ${t('Redo')}`}</p>
  },
  {
    content: <p>{t('MinimapContent')}</p>,
    placement: 'bottom',
    target: 'div.react-flow__panel.react-flow__minimap.bottom.right',
    title: <p className="text-indigo-600">{t('Minimap')}</p>
  },
  {
    content: (
      <div>
        <p>{t('CommandsContent')}</p>
        <ListWithIcons array={bottomLeftCommands} />
      </div>
    ),
    styles: {
      options: {
        width: 450
      }
    },
    placement: 'bottom',
    target: '#bottom-left',
    title: <p className="text-indigo-600">{t('Commands')}</p>
  },
  {
    content: (
      <div>
        <p>{t('TopRightCommandsContent')}</p>
        <ListWithIcons array={topRightCommands} />
      </div>
    ),
    placement: 'top',
    target: '#top-right',
    title: <p className="text-indigo-600">{t('Commands')}</p>
  },
  {
    content: <p>{t('ExampleContent')}</p>,
    spotlightPadding: 20,
    styles: {
      spotlight: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingRight: 580
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }
    },
    placement: 'top',
    target: 'div.react-flow__node.react-flow__node-start.nopan',
    title: <p className="text-indigo-600">{t('Example')}</p>
  },
  {
    content: <p>{t('NodeClick')}</p>,
    placement: 'top',
    styles: {
      spotlight: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      },
      spotlightLegacy: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }
    },
    target: 'div.react-flow__node.react-flow__node-policies.nopan',
    title: <p className="text-indigo-600">{t('NodeProperties')}</p>
  },
  {
    content: <p>{t('NodePropertiesContent')}</p>,
    placement: 'left',
    target: '#right-sidebar',
    title: <p className="text-indigo-600">{t('NodeProperties')}</p>
  },
  {
    content: <p>{t('EdgeClick')}</p>,
    placement: 'top',
    target: 'g > g:nth-child(1)',
    styles: {
      spotlight: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      },
      spotlightLegacy: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }
    },
    title: <p className="text-indigo-600">{t('EdgeProperties')}</p>
  },
  {
    content: <p>{t('EdgePropertiesContent')}</p>,
    placement: 'left',
    target: '#right-sidebar',
    title: <p className="text-indigo-600">{t('EdgeProperties')}</p>
  },
  {
    content: <p>{t('ProcessPropertiesContent')}</p>,
    placement: 'left',
    target: '#right-sidebar',
    title: <p className="text-indigo-600">{t('ProcessProperties')}</p>
  }
]

export default joyrideSteps
