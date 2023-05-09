import React from 'react'
import dayjs from 'dayjs'
import { Strategy } from '@/types/Strategy'
import CreateNew from '@/components/Policies/CreateNew'
import Skeleton from '@/components/Policies/Skeleton'

const PoliciesList = ({
  setSelectedModel,
  setOpenDetails,
  strategies
}: {
  setSelectedModel: (model: Strategy) => void
  setOpenDetails: (open: boolean) => void
  strategies: Strategy[] | null
}) => (
  <main className="pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
    <div className="mx-auto max-w-4xl">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Strategies
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          List of all the strategies you have created.
        </p>
      </div>

      <section aria-labelledby="recent-heading" className="mt-10">
        <h2 id="recent-heading" className="sr-only">
          Recent
        </h2>
        <CreateNew />

        <div className="pt-4 space-y-8 sm:space-y-12">
          {strategies ? (
            strategies.map((strategy) => (
              <div key={strategy.id}>
                <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                  <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0 ">
                    <div className="-my-6 divide-y divide-gray-200 sm:-my-10 ">
                      <div className="flex py-6 sm:py-10 ">
                        <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                          <div className="lg:flex-1">
                            <div className="sm:flex ">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {strategy.process.name}
                                </h4>
                                <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                                  {strategy.process.description}
                                </p>
                              </div>
                              <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0 pr-5">
                                <span className="text-sm text-gray-500 sm:block">
                                  <span>
                                    {dayjs(strategy.updatedAt).format(
                                      'DD MMMM YYYY'
                                    )}
                                    <span className="hidden sm:inline">
                                      {` -- ${dayjs(
                                        strategy.updatedAt
                                      ).fromNow()}`}
                                    </span>
                                  </span>
                                </span>
                              </p>
                            </div>

                            <div className="mt-2 flex text-sm font-medium sm:mt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedModel(strategy)
                                  setOpenDetails(true)
                                }}
                                className="text-indigo-600 hover:text-indigo-500"
                              >
                                View Model
                              </button>
                              <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                <button
                                  type="button"
                                  className="text-indigo-600 hover:text-indigo-500"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6 ">
                          <img
                            src={strategy.fileName}
                            alt={strategy.process.name}
                            className="col-start-2 shadow col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-40 lg:w-40"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Skeleton repeat={2} />
          )}
        </div>
      </section>
    </div>
  </main>
)

export default PoliciesList
