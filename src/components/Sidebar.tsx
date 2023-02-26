import React from 'react'

export default () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div className='description'>You can drag these nodes to the pane on the right.</div>
      <div className='dndnode input' onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className='dndnode' onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className='dndnode output' onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className='dndnode textUpdater' onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable>
        textUpdater Node
      </div>
      <div  className='dndnode' onDragStart={(event) => onDragStart(event, 'decision')} draggable>
        decision Node
      </div>
      <div className='dndnode' onDragStart={(event) => onDragStart(event, 'trapezoid')} draggable>
        trapezoid Node
      </div>
      <div className='dndnode' onDragStart={(event) => onDragStart(event, 'parallelogram')} draggable>
        parallelogram Node
      </div>

    </aside>
  )
};
