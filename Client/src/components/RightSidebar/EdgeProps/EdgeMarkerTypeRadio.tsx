import { RadioGroup } from '@headlessui/react'
import { MarkerType } from 'reactflow'
import { FC } from 'react'
import { Icon } from '@iconify/react'
import classNames from '@/utils/classNames'

const markerTypes = [MarkerType.Arrow, MarkerType.ArrowClosed]
const EdgeMarkerTypeRadio: FC<{
  edgeMarkerType: MarkerType
  setEdgeMarkerType: (markerType: MarkerType) => void
}> = ({ edgeMarkerType, setEdgeMarkerType }) => (
  <RadioGroup
    value={edgeMarkerType}
    onChange={(edgMT) => {
      setEdgeMarkerType(edgMT)
    }}
    className="mt-2 py-3"
  >
    <div className="grid grid-cols-2 gap-3 ">
      {markerTypes.map((mt) => (
        <RadioGroup.Option
          key={mt}
          value={mt}
          className={({ active, checked }) =>
            classNames(
              active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
              checked
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
              'flex items-center justify-center rounded-md py-2 px-2 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none'
            )
          }
        >
          <RadioGroup.Label as="span">
            {mt === MarkerType.Arrow ? (
              <Icon
                className="w-6 h-6"
                icon="material-symbols:arrow-right-alt"
              />
            ) : (
              <Icon
                className="w-6 h-6"
                icon="material-symbols:line-end-arrow-rounded"
              />
            )}
          </RadioGroup.Label>
        </RadioGroup.Option>
      ))}
    </div>
  </RadioGroup>
)
export default EdgeMarkerTypeRadio
