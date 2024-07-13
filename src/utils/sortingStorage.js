import AsyncStorage from '@react-native-async-storage/async-storage'

class SortingStorage {
  constructor(namespace = 'sort') {
    this.namespace = namespace
  }

  async getSortingValue() {
    const sortingOption = await AsyncStorage.getItem(
      `${this.namespace}:sortingOption`
    )
    return sortingOption ? JSON.parse(sortingOption) : null
  }

  async setSortingValue(sortingOption) {
    await AsyncStorage.setItem(
      `${this.namespace}:sortingOption`,
      JSON.stringify(sortingOption)
    )
  }

  async removeSortingValue() {
    await AsyncStorage.removeItem(`${this.namespace}:sortingOption`)
  }
}

export default SortingStorage
