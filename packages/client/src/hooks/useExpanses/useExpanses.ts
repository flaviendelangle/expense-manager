import { useQuery } from '@apollo/client'

import { listExpanses, listExpanses_expanses } from './types/listExpanses'
import { listExpansesQuery } from './useExpanses.query'

const NO_DATA: listExpanses_expanses[] = []

export const useExpanses = () => {
  const response = useQuery<listExpanses, {}>(listExpansesQuery)

  return {
    ...response,
    data: response.data?.expanses ?? NO_DATA,
  }
}
