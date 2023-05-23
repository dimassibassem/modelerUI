import { HomeIcon } from '@heroicons/react/20/solid'
import { shallow } from 'zustand/shallow'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import State from '@/types/State'
import useStore from '@/store/stateStore'
import { RFState } from '@/types/RFState'
import { useFlowStore } from '@/store'
import classNames from '@/utils/classNames'

const selector = (state: State) => ({
  pages: state.pages,
  setPages: state.setPages
})
const selector3 = (state: RFState) => ({
  process: state.process
})
const Breadcrumbs = () => {
  const { pages, setPages } = useStore(selector, shallow)
  const { process } = useFlowStore(selector3, shallow)
  const paths = window.location.pathname
    .split('/')
    .filter((path) => path !== '')

  useEffect(() => {
    if (process.processKey) {
      setPages(
        paths.map((path, index) => ({
          name: !Number.isNaN(Number(path)) ? process.processKey : path,
          link:
            path === 'modeler' ? '' : `/${paths.slice(0, index + 1).join('/')}`,
          current: index === paths.length - 1
        }))
      )
    }
  }, [process])

  return pages?.length > 0 ? (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex space-x-4 rounded-md bg-white px-6">
        <li className="flex">
          <div className="flex items-center">
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                to={page.link}
                className={classNames(
                  page.current
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700',
                  'ml-4 text-sm font-medium'
                )}
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  ) : null
}

export default Breadcrumbs
