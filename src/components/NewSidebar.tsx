import { FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import React from 'react'

const parallelogramShape = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
    <path fill='none' stroke='currentColor' strokeWidth='2'
          d='M5.586 6.45A2 2 0 0 1 7.509 5h11.84a2 2 0 0 1 1.923 2.55l-2.858 10A2 2 0 0 1 16.491 19H4.651a2 2 0 0 1-1.923-2.55l2.858-10Z' />
  </svg>
)
const diamondShape = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 256 256'>
    <path fill='currentColor'
          d='m238.8 113.9l-96.7-96.7a19.8 19.8 0 0 0-28.2 0l-96.7 96.7a19.8 19.8 0 0 0 0 28.2l96.7 96.7a19.8 19.8 0 0 0 28.2 0l96.7-96.7a19.8 19.8 0 0 0 0-28.2ZM128 219l-91-91l91-91l91 91Z' />
  </svg>
)
const trapezoidShape = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 48 48'>
    <path fill='none' stroke='currentColor' strokeWidth='4'
          d='M31.794 8H16.206a3 3 0 0 0-2.864 2.105l-8.125 26A3 3 0 0 0 8.081 40h31.838a3 3 0 0 0 2.864-3.895l-8.125-26A3 3 0 0 0 31.794 8Z' />
  </svg>
)


const shapes = [
  { name: 'input', icon: HomeIcon },
  { name: 'output', icon: UsersIcon },
  { name: 'textUpdater', icon: FolderIcon },
  { name: 'decision', icon: diamondShape },
  { name: 'trapezoid', icon: trapezoidShape },
  { name: 'parallelogram', icon: parallelogramShape }
]
const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

const Sidebar = () => (
  <div className='flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white max-w-[20%]  '>
    <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4  '>
      <div className='flex flex-shrink-0 items-center px-4'>
        <img
          className='h-8 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
      </div>
      <nav className='mt-5 flex-1 space-y-1 bg-white px-2' aria-label='Sidebar'>
        {shapes.map((item) => (
          <div
            key={item.name}
            className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
            onDragStart={(event) => {
              onDragStart(event, item.name)
            }}
            onDrag={(event) => {
              event.preventDefault()
              const draggedImage = new Image()
              draggedImage.src = 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              event.dataTransfer.setDragImage(draggedImage, 0, 0)
              const target = event.target as HTMLElement
              target.style.opacity = '0.5'
            }}
            onDragEnd={(event) => {
              event.preventDefault()
              const target = event.target as HTMLElement
              target.style.opacity = '1'
            }}
            draggable
          >
            <div className='text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                 aria-hidden='true'>
              <item.icon />
            </div>
            <span className='flex-1'>{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
    <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
      <a href='#' className='group block w-full flex-shrink-0'>
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
      </a>
    </div>
  </div>
)

export default Sidebar
