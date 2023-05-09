import React from 'react'
import { Step } from 'react-joyride'
import IconSwitcher from '@/components/LeftSidebar/IconSwitcher'
import NodeDefinition from '@/components/Joyride/NodeDefinition'
import stages from '@/constants/stages'
import {
  bottomLeftCommands,
  topRightCommands,
  undoRedoList
} from '@/constants/commands'
import Content from '@/components/Joyride/Content'
import {
  UndoRedoDefinition,
  UndoRedoIcons
} from '@/components/Joyride/UndoRedo'
import {
  BottomLeftCommandsDefinition,
  BottomLeftCommandsIcons
} from '@/components/Joyride/BottomLeftCommands'
import {
  TopRightCommandsDefinition,
  TopRightCommandsIcons
} from '@/components/Joyride/TopRightCommands'

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
            <Content
              list={stages}
              Icon={IconSwitcher as React.FC<{ type: string }>}
              Definition={NodeDefinition as React.FC<{ type: string }>}
            />
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
    title: <p className="text-indigo-600 ">{t('Stages')}</p>
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
          <Content
            list={undoRedoList}
            Definition={UndoRedoDefinition}
            Icon={UndoRedoIcons}
          />
        </div>
      </div>
    ),
    styles: {
      tooltipTitle: {
        textAlign: 'center'
      },
      tooltipContainer: {
        textAlign: 'left'
      }
    },
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
        <Content
          list={bottomLeftCommands}
          Definition={BottomLeftCommandsDefinition}
          Icon={BottomLeftCommandsIcons}
        />
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
        <Content
          list={topRightCommands}
          Definition={TopRightCommandsDefinition}
          Icon={TopRightCommandsIcons}
        />
      </div>
    ),
    placement: 'top',
    styles: {
      tooltipTitle: {
        textAlign: 'center'
      },
      tooltipContainer: {
        textAlign: 'left'
      }
    },
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
