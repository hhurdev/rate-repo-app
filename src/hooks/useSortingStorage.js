import { useContext } from 'react'
import SortingContext from '../contexts/SortingContext'

// This hook returns the sorting storage object that is stored in the SortingContext.
// This hook can be used to access the sorting
// storage object in components that are wrapped in the SortingContext.Provider.
const useSortingStorage = () => {
  return useContext(SortingContext)
}

export default useSortingStorage
