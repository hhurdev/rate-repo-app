import { View, TextInput, StyleSheet } from 'react-native'
import Text from './Text'

// tyylit on vähän incongruentit, ja vähän sekavat eri tiedostoissa,
// mutta en nyt jaksa niistä välittää tässä kurssissa,
// kun teen fronttiharjoituksia muualla
const styles = StyleSheet.create({
  inputText: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorMessage: {
    marginTop: -10,
    marginBottom: 10,
  },
})

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  error,
  style,
  secureTextEntry,
}) => (
  <View>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={'#9e9e9e'}
      value={value}
      onChangeText={onChangeText}
      style={[styles.inputText, error && styles.errorInput, style]}
      secureTextEntry={secureTextEntry}
    />
    {error && (
      <Text error style={styles.errorMessage}>
        {error}
      </Text>
    )}
  </View>
)

export default CustomTextInput
