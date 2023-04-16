import React, { useState, DragEvent, MouseEvent, FocusEvent } from 'react'
import { Link } from 'react-router-dom'
import { isEdge } from 'react-device-detect'
import { useEffectOnce } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import logoBankerise from '@/assets/logo-bankerise.png'
import IconSwitcher from './IconSwitcher'
import NodeType from '@/types/NodeType'
import classNames from '@/utils/classNames'
import useLocalStorage from '@/store/localStorage'
import LangSelect from '@/components/LeftSidebar/LangSelect'
import capitalize from '@/utils/capitalize'

const shapes = [
  NodeType.Start,
  NodeType.End,
  NodeType.Policies,
  NodeType.Execution,
  NodeType.Provisioners,
  NodeType.Rule
]

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
    svgCopy?.setAttribute('width', '80')
    svgCopy?.setAttribute('height', '80')
    const img = new Image()
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgCopy.outerHTML)}`
    setPreviewImage(img.src)
  }
}
const LeftSidebar = () => {
  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => setExpanded(!expanded)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const setRun = useLocalStorage((store) => store.setRun)
  useEffectOnce(() => {
    const img = new Image()
    img.src = logoBankerise
    img.onload = () => setImageLoaded(true)
  })
  const { t } = useTranslation()
  return (
    <div
      id="left-sidebar"
      className="min-h-0 flex-1 flex-col border-r border-gray-200 bg-white max-w-[20%] hidden lg:flex "
    >
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4  ">
        <div className="flex flex-shrink-0 items-center px-4">
          {imageLoaded ? (
            <img
              className="h-16 w-auto"
              src={logoBankerise}
              height="50"
              width="50"
              alt="Bankerise"
            />
          ) : (
            <img src="https://via.placeholder.com/150" alt="thumbnail" />
          )}
        </div>
        <nav className="mt-5 flex-1" aria-label="Sidebar">
          <button
            type="button"
            onClick={toggleExpanded}
            className={classNames(
              expanded
                ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                : 'bg-gray-100 text-gray-900',
              'pl-3 ml-2 text-gray-600 hover:text-gray-900 items-center p-2 text-sm font-medium rounded-md flex w-full max-w-[90%]'
            )}
          >
            {t('Shapes')}
          </button>
          {expanded && (
            <div id="shapes" className="px-2">
              {shapes.map((item) => (
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
                    <IconSwitcher node={item} />
                  </div>
                  <span className="flex-1">{capitalize(t(item))}</span>
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>
      <LangSelect />
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
        <Link to="/profile" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Tom Cook
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                {t('ViewProfile')}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setRun(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
      >
        {t('Tutorial')}
      </button>
    </div>
  )
}

export default LeftSidebar
