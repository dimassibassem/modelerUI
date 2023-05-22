import React, { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  ExclamationTriangleIcon,
  FolderIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline'
import { shallow } from 'zustand/shallow'
import useAllCommands from '@/hooks/useAllCommands'
import classNames from '@/utils/classNames'
import { ChallengeState } from '@/types/ChallengeState'
import useChallengeStore from '@/store/challengesStore'
import CommandInput from '@/types/CommandInput'

const selector = (state: ChallengeState) => ({
  challenges: state.challenges
})

const CommandPalette = ({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const [rawQuery, setRawQuery] = useState('')
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
  const { challenges } = useChallengeStore(selector, shallow)
  const helps = useAllCommands()

  const filteredChallenges = (() => {
    if (rawQuery === '#') {
      return challenges
    }
    if (query === '' || rawQuery.startsWith('>')) {
      return []
    }
    return challenges?.filter((challenge) =>
      challenge.processKey.toLowerCase().includes(query)
    )
  })()

  const filtredHelps = (() => {
    if (rawQuery === '>') {
      return helps
    }
    if (query === '' || rawQuery.startsWith('#')) {
      return []
    }
    return helps.filter((help) => help.name.toLowerCase().includes(query))
  })()

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setRawQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(event: CommandInput) => event.action()}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    value={rawQuery}
                    onChange={(event) => {
                      setRawQuery(event.target.value)
                    }}
                  />
                </div>

                {((filteredChallenges && filteredChallenges?.length > 0) ||
                  helps.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredChallenges && filteredChallenges.length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">
                          Challenges
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filteredChallenges?.map((challenge) => (
                            <Combobox.Option
                              key={challenge.id}
                              value={challenge}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center px-4 py-2',
                                  active ? 'bg-indigo-600 text-white' : ''
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <FolderIcon
                                    className={classNames(
                                      'h-6 w-6 flex-none',
                                      active ? 'text-white' : 'text-gray-400'
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {challenge.processKey}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                    {filtredHelps.length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">
                          Helps
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filtredHelps.map((help) => (
                            <Combobox.Option
                              data-combobox-item
                              key={help.id}
                              value={help}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center px-4 py-2',
                                  active ? 'bg-indigo-600 text-white' : ''
                                )
                              }
                              onClick={async () => {
                                await help.action()
                              }}
                            >
                              {help.icon}
                              <span className="ml-3 flex-auto truncate">
                                {help.name}
                              </span>
                              <div className="flex flex-col">
                                <span className="ml-3 flex-auto truncate">
                                  {help.text}
                                </span>
                              </div>
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {rawQuery === '?' && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <LifebuoyIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      Help with searching
                    </p>
                    <p className="mt-2 text-gray-500">
                      Use this tool to quickly search for challenges and
                      Challenges across our entire platform. You can also use
                      the search modifiers found in the footer below to limit
                      the results to just challenges or Challenges.
                    </p>
                  </div>
                )}

                {query !== '' &&
                  rawQuery !== '?' &&
                  filteredChallenges?.length === 0 &&
                  helps.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <ExclamationTriangleIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        No results found
                      </p>
                      <p className="mt-2 text-gray-500">
                        We couldn’t find anything with that term. Please try
                        again.
                      </p>
                    </div>
                  )}

                <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
                  Type{' '}
                  <button type="button" onClick={() => setRawQuery('#')}>
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('#')
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      #
                    </kbd>{' '}
                  </button>
                  <span className="sm:hidden">for Challenges,</span>
                  <span className="hidden sm:inline">
                    to access Challenges,
                  </span>
                  <button type="button" onClick={() => setRawQuery('>')}>
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('>')
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      &gt;
                    </kbd>{' '}
                  </button>
                  for commands help, and{' '}
                  <button type="button" onClick={() => setRawQuery('?')}>
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery === '?'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      ?
                    </kbd>{' '}
                  </button>
                  for general help.
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default CommandPalette
