import { useId } from 'react'

const Skeleton = ({ repeat = 1 }) => {
  const id = useId()
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div key={`${id + i}`} className="pl-6">
            <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
              <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0 ">
                <div className="-my-6 divide-y divide-gray-200 sm:-my-10 ">
                  <div className="flex py-6 sm:py-10 ">
                    <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                      <div className="lg:flex-1">
                        <div className="flex animate-pulse">
                          <div className="flex-shrink-0">
                            <span className="mt-2 w-32 h-32 block rounded-xl bg-gray-400" />
                          </div>
                          <div className="ml-6 mt-3 w-full">
                            <div className="h-4  rounded-md bg-gray-400 w-2/5" />
                            <ul className="mt-5 space-y-3">
                              <li className="w-full h-3 rounded-md bg-gray-400 opacity-80" />
                              <li className="w-full h-3 rounded-md bg-gray-400 opacity-80" />
                              <li className="w-full h-3 rounded-md bg-gray-400 opacity-80" />
                              <li className="w-full h-3 rounded-md bg-gray-400 opacity-80" />
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default Skeleton
