import { View } from 'react-native'

import SearchBar from './SearchBar'
import RepositoryPicker from './RepositoryPicker'

const RepositoryListHeader = ({
  searchKeyword,
  handleSearch,
  selectedSortingOption,
  onSortingChange,
}) => (
  <View>
    <SearchBar searchKeyword={searchKeyword} onSearch={handleSearch} />
    <RepositoryPicker
      selectedValue={selectedSortingOption}
      onSortingChange={onSortingChange}
    />
  </View>
)

export default RepositoryListHeader
