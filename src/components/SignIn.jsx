import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import * as yup from 'yup'
import { useFormik } from 'formik';
import theme from '../../theme';
import Text from './Text';

const initialValues = {
  username: '',
  password: ''
}

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
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  loginButton: {
    backgroundColor: '#237fb7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  boldWhiteText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold
  },
  errorInput: {
    borderColor: 'red'
  },
  errorMessage: {
    marginTop: -10,
    marginBottom: 10
  }
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username needs to have at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password needs to be at least 5 characters long')
    .required('Password is required')
})

const SignIn = ({ handleSubmit }) => {
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.inputText,
          formik.touched.username && formik.errors.username && styles.errorInput
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text error style={styles.errorMessage}>{formik.errors.username}</Text>
      )}
      <TextInput 
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[
          styles.inputText,
          formik.touched.password && formik.errors.password && styles.errorInput
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text error style={styles.errorMessage}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={styles.loginButton}
        onPress={formik.handleSubmit}>
        <Text style={styles.boldWhiteText}>Sign in</Text>
      </Pressable>
    </View>
  )
};

export default SignIn;