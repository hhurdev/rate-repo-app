import { Picker } from '@react-native-picker/picker'

const RepositoryPicker = ({ selectedValue, onSortingChange }) => {
  const handleValueChange = (itemValue) => {
    onSortingChange(itemValue) // Notify the parent component
  }

  return (
    <Picker
      selectedValue={selectedValue}
      style={{ padding: 10 }}
      onValueChange={handleValueChange}
    >
      <Picker.Item label="Latest Repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  )
}

export default RepositoryPicker
