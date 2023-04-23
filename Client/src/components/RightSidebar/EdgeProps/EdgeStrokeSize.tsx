import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const EdgeStrokeSize: FC<{
  strokeWidth: number
  setStrokeWidth: (value: number) => void
}> = ({ strokeWidth, setStrokeWidth }) => {
  const { t } = useTranslation()
  return (
    <div>
      <label htmlFor="size" className="ml-3 text-sm font-medium text-gray-900">
        {t('Stroke')}
      </label>
      <input
        type="range"
        className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
        id="size"
        min="1"
        max="4"
        value={strokeWidth}
        onChange={(e) => {
          setStrokeWidth(Number(e.target.value))
        }}
      />
    </div>
  )
}
export default EdgeStrokeSize
