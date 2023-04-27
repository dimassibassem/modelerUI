interface LocalStorageState {
  lang: string
  setLang: (lang: string) => void
  run: boolean
  setRun: (run: boolean) => void
}

export default LocalStorageState
