import React from 'react'
import { View } from 'react-native'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import RepositoryListContainer from './RepositoryListContainer'
import Text from './Text'
import useRepositories from '../hooks/useRepositories'

// TODO: refactor this component to use hooks
const RepositoryList = () => {
  const [sortingCriteria, setSortingCriteria] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  })

  const [selectedSortingOption, setSelectedSortingOption] = useState('latest')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  const sortingOptions = {
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  }

  const { repositories, error, loading } = useRepositories(
    sortingCriteria,
    debouncedSearchKeyword
  )

  const handleSortingChange = (selectedValue) => {
    // tämä funktio siirtyy Pickerille ja saa sitä kautta nykyisen valitun option
    // tallentaa nykyisen arvon myös stateen, joka siirtyy sitten
    // Pickerille, jossa sitä käytetään nykyisenä valittuna arvona
    // muuten Picker ei tiedä mikä on nykyinen valittu arvo ja UI näyttää väärin.
    // kun Pickerin arvo muuttuu, kutsuu se siis tätä funktiota
    setSortingCriteria(sortingOptions[selectedValue])
    setSelectedSortingOption(selectedValue)
  }

  const handleSearch = (searchKeyword) => {
    setSearchKeyword(searchKeyword)
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <RepositoryListContainer
        repositories={repositories}
        searchKeyword={searchKeyword}
        handleSearch={handleSearch}
        selectedValue={selectedSortingOption}
        onSortingChange={handleSortingChange}
      />
    </View>
  )
}

export default RepositoryList
