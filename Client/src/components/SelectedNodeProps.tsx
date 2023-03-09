import React from 'react'

const SelectedNodeProps = ({
                             nodeText,
                             setNodeText
                           }
                             : { nodeText: string, setNodeText: (text: string) => void }
) => (
  <div>
    <label htmlFor='node-text' className='ml-3 text-sm font-medium text-gray-900'>Label</label>
    <div>
      <input
        type='label'
        name='node-text'
        id='node-text'
        className='block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
        placeholder='Add a text'
        value={nodeText}
        onChange={(e) => setNodeText(e.target.value)}
      />
    </div>
  </div>
)

export default SelectedNodeProps
