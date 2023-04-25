import { RadioGroup } from '@headlessui/react'
import { FC } from 'react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import classNames from '@/utils/classNames'

const edgeTypes = [
  {
    name: 'straight',
    icon: <Icon className="w-5 h-5" icon="ic:round-horizontal-rule" />
  },
  {
    name: 'smoothstep',
    icon: <Icon className="w-5 h-5" icon="ph:wave-sine-light" />
  },
  { name: 'step', icon: <Icon className="w-5 h-5" icon="ph:wave-square" /> },
  { name: 'default', icon: 'default' }
]
const EdgeRadioGroup: FC<{
  edgeType: string
  setEdgeType: (edgeType: string) => void
}> = ({ edgeType, setEdgeType }) => {
  const { t } = useTranslation()
  return (
    <>
      <span className="ml-3 text-sm font-medium text-gray-900">
        {t('Edge Type')}
      </span>
      <RadioGroup
        value={edgeType}
        onChange={(type) => {
          setEdgeType(type)
        }}
        className="mt-2 py-3"
      >
        <div className="grid grid-cols-4 gap-3 ">
          {edgeTypes.map((edgeProp) => (
            <RadioGroup.Option
              key={edgeProp.name}
              value={edgeProp.name}
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
                {typeof edgeProp.icon === 'string'
                  ? t(edgeProp.icon)
                  : edgeProp.icon}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  )
}
export default EdgeRadioGroup
