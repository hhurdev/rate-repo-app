import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-native'

import theme from '../../theme'
import Text from './Text'
import useSignIn from '../hooks/useSignIn'

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
    padding: 15,
  },
  loginButton: {
    backgroundColor: '#237fb7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  boldWhiteText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorMessage: {
    marginTop: -10,
    marginBottom: 10,
  },
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username needs to have at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password needs to be at least 5 characters long')
    .required('Password is required'),
})

const SignIn = () => {
  // the result contains information about the mutation
  const [signIn, result] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    // useFormik automaticall adds the values when onSubmit is called
    const { username, password } = values

    try {
      const data = await signIn({ username, password })
      navigate('/')
      console.log('signIn data', data)
    } catch (e) {
      console.log(e)
    }
  }

  /* returns an object with among others,
    {
      values: {
        username: ..,
        password: ...
      },
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleSubmit,
      resetForm,
      initialValues: {

      }
      etc...
    }
  */
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.inputText,
          formik.touched.username &&
            formik.errors.username &&
            styles.errorInput,
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text error style={styles.errorMessage}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[
          styles.inputText,
          formik.touched.password &&
            formik.errors.password &&
            styles.errorInput,
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text error style={styles.errorMessage}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable style={styles.loginButton} onPress={formik.handleSubmit}>
        <Text style={styles.boldWhiteText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export default SignIn
