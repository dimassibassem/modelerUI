import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import {
  ExclamationTriangleIcon,
  FolderIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import classNames from '@/utils/classNames'
import { Challenge } from '@/types/Challenge'
import CommandInput from '@/types/CommandInput'
import useChallengeStore from '@/store/challengesStore'
import useAllCommands from '@/hooks/useAllCommands'
import { ChallengeState } from '@/types/ChallengeState'
import CommandPaletteFooter from './CommandPaletteFooter'

const selector = (state: ChallengeState) => ({
  challenges: state.challenges
})

const CommandPaletteComboBox = ({
  setOpen,
  rawQuery,
  setRawQuery
}: {
  setOpen: (open: boolean) => void
  rawQuery: string
  setRawQuery: React.Dispatch<React.SetStateAction<string>>
}) => {
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
  const { challenges } = useChallengeStore(selector, shallow)
  const helps = useAllCommands()
  const navigate = useNavigate()
  const { t } = useTranslation()
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
    <Combobox
      onChange={(event: CommandInput | Challenge) => {
        if ((event as Challenge).processKey) {
          navigate(`/modeler/${event.id}`)
          setOpen(false)
        } else {
          ;(event as CommandInput).action()
        }
      }}
    >
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
                    onClick={() => {
                      navigate(`/modeler/${challenge.id}`)
                      setOpen(false)
                    }}
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
                {t('Commands')}
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
                    <span className="ml-3 flex-auto truncate">{help.name}</span>
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
            {t('Help with searching')}
          </p>
          <p className="mt-2 text-gray-500">{t('searchContent')}</p>
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
              {t('No results found')}
            </p>
            <p className="mt-2 text-gray-500">{t('tryAgainContent')}</p>
          </div>
        )}
      <CommandPaletteFooter rawQuery={rawQuery} setRawQuery={setRawQuery} />
    </Combobox>
  )
}

export default CommandPaletteComboBox
