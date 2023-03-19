import { useState, DragEvent } from 'react'
import { Link } from 'react-router-dom'
import logoBankerise from '../assets/logo-bankerise.png'
import iconSwitcher from './iconSwitcher'
import NodeTypes from '../types/NodeTypes'
import classNames from '../utils/classNames'

const shapes = [
  NodeTypes.Start,
  NodeTypes.End,
  NodeTypes.Policies,
  NodeTypes.Execution,
  NodeTypes.Provisioners,
  NodeTypes.Rule
]
const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: NodeTypes) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = () => setExpanded(!expanded)
  return (
    <div className='flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white max-w-[20%]  '>
      <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4  '>
        <div className='flex flex-shrink-0 items-center px-4'>
          <img
            className='h-16 w-auto'
            src={logoBankerise}
            alt='Bankerise'
          />
        </div>
        <nav className='mt-5 flex-1' aria-label='Sidebar'>
          <button
            type='button'
            onClick={toggleExpanded}
            className={
              classNames(
                expanded ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' : 'bg-gray-100 text-gray-900',
                'ml-3 text-gray-600 hover:text-gray-900 items-center p-2 text-sm font-medium rounded-md flex w-full max-w-[90%]')
            }>
            Shapes
          </button>
          {expanded &&
            <>
              {shapes.map((item) => (
                <div
                  key={item}
                  className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  onDragStart={(event) => {
                    onDragStart(event, item)
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
                  <div className='text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                       aria-hidden='true'>
                    {iconSwitcher(item)}
                  </div>
                  <span className='flex-1'>{item}</span>
                </div>
              ))}
            </>}
        </nav>
      </div>
      <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
        <Link
          to='/profile'
          className='group block w-full flex-shrink-0'>
          <div className='flex items-center'>
            <div>
              <img
                className='inline-block h-9 w-9 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>Tom Cook</p>
              <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>View profile</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
