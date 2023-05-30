import { ProcessBKRModel } from '@/types/ProcessBKRModel'
import ResetState from './ResetState'

export interface ProcessBKRState extends ResetState {
  processesBKRModel: ProcessBKRModel[] | null
  setProcessesBKRModel: (processBKRModel: ProcessBKRModel[]) => void
  selectedProcessBKRModel: ProcessBKRModel | null
  setSelectedProcessBKRModel: (
    selectedProcessBKRModel: ProcessBKRModel | null
  ) => void
}
