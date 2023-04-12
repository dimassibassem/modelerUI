import React from "react";
import { Step } from "react-joyride";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import iconSwitcher from "@/components/leftSidebar/iconSwitcher";
import NodeTypes from "@/types/NodeTypes";


const shapes = [
  NodeTypes.Start,
  NodeTypes.End,
  NodeTypes.Policies,
  NodeTypes.Execution,
  NodeTypes.Provisioners,
  NodeTypes.Rule
];

type ListWithProps = {
  name: string;
  icon: JSX.Element;
}

const undoRedoList = [
  {
    name: "Undo",
    icon: <Icon className="w-5 h-5" icon="material-symbols:undo" />
  },
  {
    name: "Redo",
    icon: <Icon className="w-5 h-5" icon="material-symbols:undo" hFlip />
  }
];

const bottomLeftCommands = [
  {
    name: "Vertical layout",
    icon: <Icon className="w-5 h-5" icon="material-symbols:swap-vertical-circle-outline-rounded" />
  },
  {
    name: "Horizontal layout",
    icon: <Icon className="w-5 h-5" icon="material-symbols:swap-horizontal-circle-outline-rounded" />
  },
  {
    name: "Fit Screen",
    icon: <Icon className="w-5 h-5" icon="material-symbols:fit-screen" />
  },
  {
    name: "Chain Recovery",
    icon: <Icon className="w-5 h-5" icon="fa:chain" />
  },
  {
    name: "Zoom In",
    icon: <MagnifyingGlassPlusIcon className="w-5 h-5" />
  },
  {
    name: "Zoom Out",
    icon: <MagnifyingGlassMinusIcon className="w-5 h-5" />
  },
  {
    name: "Full Screen",
    icon: <Icon className="w-5 h-5" icon="solar:full-screen-bold" />
  }
];

const topRightCommands = [
  {
    name: "Clear",
    icon: <Icon className="w-5 h-5" icon="ic:outline-clear" />
  },
  {
    name: "Save",
    icon: <Icon className="w-5 h-5" icon="material-symbols:save-outline-rounded" />
  },
  {
    name: "Import",
    icon: <Icon className="w-5 h-5" icon="uil:import" />
  }
];


const ListWithIcons = ({ array }: { array: ListWithProps[] }) => (
  <ul className="mt-3 grid grid-cols-1 gap-1 gap-y-2">
    {array.map((item) => (
      <li key={item.name} className="col-span-1 flex rounded-md border shadow-md">
        <div
          className="flex flex-shrink-0 items-center justify-center p-2">
          {item.icon}
        </div>
        <div
          className="flex flex-1 items-center justify-between">
          <div className=" p-2 text-sm">
            {item.name}
          </div>
        </div>
      </li>
    ))}
  </ul>
);


const joyrideSteps: Step[] = [
  {
    content: <p>Let's take a quick tour</p>,
    placement: "center",
    target: "body",
    title: <p className="text-indigo-600"> Welcome to the Modeler</p>
  },
  {
    content: <p>Here you can define a title and description for your process</p>,
    placement: "right",
    target: "#process-modal",
    title: <p className="text-indigo-600">Process Definition</p>
  },
  {
    content: <p>it contains all the elements you can use to build your process</p>
    ,
    placement: "right",
    target: "#left-sidebar",
    title: <p className="text-indigo-600">Sidebar</p>
  },
  {
    content:
      <div><p>Here you can find all the shapes you can drag to the flow</p>
        <div>
          <ul className="mt-3 grid grid-cols-1 gap-1 gap-y-2">
            {shapes.map((shape) => (
              <li key={shape} className="col-span-1 flex rounded-md border shadow-md">
                <div
                  className="flex flex-shrink-0 items-center justify-center p-2">
                  {iconSwitcher(shape)}
                </div>
                <div
                  className="flex flex-1 items-center justify-between">
                  <div className=" p-2 text-sm">
                    {shape} lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>,
    styles: {
      options: {
        width: 400
      }
    },
    placement: "right",
    target: "#shapes",
    title: <p className="text-indigo-600">Shapes</p>
  },
  {
    content: (
      <p>
        Here you can drop the shapes you want to use in your process
      </p>
    ),
    placement: "top",
    target: "#reactflow-wrapper",
      styles: {
        spotlight: {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)"
        }
      },
    title: <p className="text-indigo-600">Flow</p>
  },
  {
    content: (
      <div><p>
        Undo / Redo actions are available in the top left corner
      </p>
        <div>
          <ListWithIcons array={undoRedoList} />
        </div>
      </div>
    ),
    placement: "left",
    target: "#top-left",
    title: <p className="text-indigo-600">Undo / Redo</p>
  },
  {
    content: (
      <p>
        Here you can find a minimap of your process
      </p>
    ),
    placement: "bottom",
    target: "div.react-flow__panel.react-flow__minimap.bottom.right",
    title: <p className="text-indigo-600">Minimap</p>
  },
  {
    content: (
      <div>
        <p>
          Here you can find the commands to interact with the flow
        </p>
        <ListWithIcons array={bottomLeftCommands} />
      </div>
    ),
    styles: {
      options: {
        width: 450
      }
    },
    placement: "bottom",
    target: "#bottom-left",
    title: "Commands"
  },
  {
    content: (
      <div>
        <p>
          Here you can find other commands
        </p>
        <ListWithIcons array={topRightCommands} />
      </div>
    ),
    placement: "top",
    target: "#top-right",
    title: <p className="text-indigo-600"> Commands</p>
  },
  {
    content: (
      <p>
        This is an example of a completed process from start to end
      </p>
    ),
    spotlightPadding: 20,
    styles: {
      spotlight: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        paddingRight: 580
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)"
      }
    },
    placement: "top",
    target: "div.react-flow__node.react-flow__node-start.nopan",
    title: <p className="text-indigo-600">Example</p>
  },
  {
    content: (
      <p>
        By clicking on the node you can see the properties of the node and edit them in the right sidebar
      </p>
    ),
    placement: "top",
    target: "div.react-flow__node.react-flow__node-policies.nopan",
    title: <p className="text-indigo-600">Properties</p>
  },
  {
    content: (
      <p>
        Here you can find the properties of the node you selected
      </p>
    ),
    placement: "left",
    target: "#right-sidebar",
    title: <p className="text-indigo-600">Node Properties</p>
  },
  {
    content: (
      <p>
        By clicking on the Edge you can see the properties of the Edge and edit them in the right sidebar
      </p>
    ),
    placement: "left",
    target: "g > g:nth-child(1)",
    title: <p className="text-indigo-600">Edge Properties</p>
  },
  {
    content: (
      <p>
        Here you can find the properties of the Edge you selected
      </p>
    ),
    placement: "left",
    target: "#right-sidebar",
    title: <p className="text-indigo-600">Edge Properties</p>
  },
  {
    content: (
      <p>
        If neither a node or an edge is selected, you can find the properties of the process here and edit them in the
        right sidebar
      </p>
    ),
    placement: "left",
    target: "#right-sidebar",
    title: <p className="text-indigo-600">Process Properties</p>
  }
];

export default joyrideSteps;
