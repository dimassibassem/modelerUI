import { Fragment, useId } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Challenge } from '@/types/Challenge'
import capitalize from '@/utils/capitalize'

const Details = ({
  open,
  setOpen,
  challenge
}: {
  open: boolean
  setOpen: (open: boolean) => void
  challenge: Challenge | null
}) => {
  const navigate = useNavigate()
  const id = useId()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-96">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full overflow-y-auto bg-white p-8">
                    <div className="space-y-6 pb-16">
                      <div>
                        <div className="aspect-h-7 aspect-w-10 block w-full shadow overflow-hidden rounded-lg">
                          <img
                            src={challenge?.fileName}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                        <div className="mt-4 flex items-start justify-between">
                          <h2 className="text-base font-semibold leading-6 text-gray-900">
                            <span className="sr-only">Details for </span>
                            {challenge?.process.name}
                          </h2>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Information
                        </h3>
                        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Created</dt>
                            <dd className="text-gray-900">
                              {dayjs(challenge?.createdAt).format(
                                'DD MMMM YYYY, h:mm:ss a'
                              )}
                            </dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Last modified</dt>
                            <dd className="text-gray-900">
                              {dayjs(challenge?.updatedAt).format(
                                'DD MMMM YYYY, h:mm:ss a'
                              )}
                            </dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Hook Name</dt>
                            <dd className="text-gray-900">
                              {challenge?.process.hook.name}
                            </dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Channels</dt>
                            <dd className="text-gray-900">
                              {challenge?.process.hook.channels.map(
                                (channel, i) => (
                                  <span key={`${id + i}`}>
                                    {capitalize(channel)}
                                    {i !==
                                      challenge.process.hook.channels.length -
                                        1 && ', '}
                                  </span>
                                )
                              )}
                            </dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">IsAsync</dt>
                            <dd className="text-gray-900">
                              {challenge?.process.hook.isAsync ? 'Yes' : 'No'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Description
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm italic text-gray-500">
                            {challenge?.process.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Stages</h3>
                        {challenge?.process.steps.map((step, i) => (
                          <div key={`${id + i}`} className="mt-2">
                            <h2 className=" font-medium text-gray-900">
                              Combination {i + 1}
                            </h2>
                            <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                              {step?.map((stage, index) => (
                                <div key={`${index + stage.id}`}>
                                  <dt className="font-medium">
                                    {capitalize(stage.type)}
                                  </dt>
                                  <div>
                                    {Object.keys(stage.attributes).map(
                                      (key) => (
                                        <div
                                          key={stage.id + key}
                                          className="flex justify-between py-3 text-sm font-medium"
                                        >
                                          <dt className="text-gray-500">
                                            {capitalize(key)}
                                          </dt>
                                          <dd className="text-gray-900">
                                            {stage.attributes?.[key]}
                                          </dd>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))}
                            </dl>
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => navigate(`/modeler/${challenge?.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Details
