import React from "react";
import { Panel } from "reactflow";
import { Icon } from "@iconify/react";
import classNames from "@/utils/classNames";
import { useTemporalStore } from "@/store";

const TopLeftPanel = () => {
  const { undo, redo, futureStates, pastStates } = useTemporalStore(
    (state) => state
  );


  return (
    <Panel id="top-left" className="grid grid-cols-1 gap-2" position="top-left">
      <div className="grid grid-cols-2 items-stretch gap-2">
        <div className="group flex relative">
          <button
            aria-label="Undo"
            className={classNames(
              pastStates.length === 0
                ? "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
              "rounded-full  py-1 px-2.5 text-sm font-semibold  shadow-sm"
            )}
            type="button"
            onClick={() => {
              undo();
            }}
            disabled={pastStates.length === 0}
          >
            <Icon className="w-5 h-5" icon="material-symbols:undo" />
          </button>
          <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Undo</span>
        </div>
        <div className="group flex relative">
          <button
            aria-label="Redo"
            className={classNames(
              futureStates.length === 0
                ? "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
              "rounded-full  py-1 px-2.5 text-sm font-semibold  shadow-sm"
            )}
            type="button"
            onClick={() => {
              redo();
            }}
            disabled={futureStates.length === 0}
          >
            <Icon className="w-5 h-5" icon="material-symbols:undo" hFlip />
          </button>
          <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Redo</span>

        </div>
      </div>
    </Panel>
  );
};

export default TopLeftPanel;
