import { RadioGroup } from '@headlessui/react'
import classNames from '../utils/classNames'

const EdgeRadioGroup = ({
                          selectedEdgeType,
                          setSelectedEdgeType,
                          edgeProps
                        }: { edgeProps: string[], selectedEdgeType: string, setSelectedEdgeType: (arg0: string) => void }) => (
    <RadioGroup value={selectedEdgeType} onChange={setSelectedEdgeType} className='mt-2 py-3'>
      <RadioGroup.Label className='sr-only'> Choose a memory option </RadioGroup.Label>
      <div className='grid grid-cols-4 gap-3 '>
        {edgeProps.map((edgeProp) => (
          <RadioGroup.Option
            key={edgeProp}
            value={edgeProp}
            className={({ active, checked }) =>
              classNames(
                active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                checked
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none'
              )
            }
          >
            <RadioGroup.Label as='span'>{edgeProp}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
export default EdgeRadioGroup
