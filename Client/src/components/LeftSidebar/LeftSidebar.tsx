import React, { useState, DragEvent, MouseEvent, FocusEvent } from 'react'
import { isEdge } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import IconSwitcher from './IconSwitcher'
import NodeType from '@/types/enums/NodeType'
import classNames from '@/utils/classNames'
import capitalize from '@/utils/capitalize'
import stages from '@/constants/stages'

const onDragStart = (
  event: DragEvent<HTMLDivElement>,
  nodeType: NodeType,
  previewImage: string
) => {
  const img = new Image()
  img.src = previewImage
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
  if (isEdge) {
    event.dataTransfer.setDragImage(img, 10, 10)
  }

  // @ts-ignore
  // event.dataTransfer.forceFallback = true
}

const handlePreviewDragImage = (
  event: MouseEvent<HTMLDivElement> | FocusEvent<HTMLDivElement>,
  setPreviewImage: (previewImage: string) => void
) => {
  event.preventDefault()
  const svgElement = (event.target as Element).querySelector<SVGElement>('svg')
  if (svgElement) {
    const svgCopy = svgElement.cloneNode(true) as SVGElement
    svgCopy.setAttribute('width', '80')
    svgCopy.setAttribute('height', '80')
    const img = new Image()
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgCopy.outerHTML)}`
    setPreviewImage(img.src)
  }
}
const LeftSidebar = () => {
  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => setExpanded(!expanded)
  const [previewImage, setPreviewImage] = useState<string>('')

  const { t } = useTranslation()
  return (
    <div
      id="left-sidebar"
      className="pt-3 overflow-y-auto min-h-0 flex-1 flex-col border-r border-gray-200 bg-white max-w-[20%] hidden lg:flex "
    >
      <button
        type="button"
        onClick={toggleExpanded}
        className={classNames(
          expanded
            ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            : 'bg-gray-100 text-gray-900',
          'pl-3 ml-2 text-gray-600 p-2 hover:text-gray-900 items-center text-sm font-medium rounded-md flex w-full max-w-[90%]'
        )}
      >
        {t('Stages')}
      </button>
      <div className="flex flex-1 flex-col">
        <nav className="flex-1" aria-label="Sidebar">
          {expanded && (
            <div id="shapes" className="px-2">
              {stages.map((item) => (
                <div
                  onMouseOver={(event: MouseEvent<HTMLDivElement>) => {
                    handlePreviewDragImage(event, setPreviewImage)
                  }}
                  onFocus={(event: FocusEvent<HTMLDivElement>) => {
                    handlePreviewDragImage(event, setPreviewImage)
                  }}
                  key={item}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  onDragStart={(event) => {
                    onDragStart(event, item, previewImage)
                  }}
                  onDrag={(event) => {
                    event.preventDefault()
                    const target = event.target as HTMLElement
                    target.style.opacity = '0.5'
                  }}
                  onDragEnd={(event) => {
                    event.preventDefault()
                    const target = event.target as HTMLElement
                    target.style.opacity = '1'
                  }}
                  draggable="true"
                >
                  <div
                    className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  >
                    <IconSwitcher type={item} />
                  </div>
                  <span className="flex-1">{capitalize(t(item))}</span>
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default LeftSidebar
