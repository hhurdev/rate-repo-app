import { TextInput, StyleSheet, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  background: {
    backgroundColor: 'white',
  },
})

const SearchBar = ({ searchKeyword, onSearch }) => {
  return (
    <View style={styles.background}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        placeholderTextColor={'#9e9e9e'}
        value={searchKeyword}
        onChangeText={onSearch}
      />
    </View>
  )
}

export default SearchBar
