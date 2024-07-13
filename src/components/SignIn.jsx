import { Pressable, View, StyleSheet } from 'react-native'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-native'

import theme from '../../theme'
import Text from './Text'
import useSignIn from '../hooks/useSignIn'
import CustomTextInput from './CustomTextInput'

const styles = StyleSheet.create({
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

export const SignInContainer = ({ onSubmit }) => {
  /* returns an object
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
      <CustomTextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : null
        }
      />
      <CustomTextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null
        }
        secureTextEntry
      />
      <Pressable style={styles.loginButton} onPress={formik.handleSubmit}>
        <Text style={styles.boldWhiteText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  // the result contains information about the mutation
  const [signIn, result] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    // useFormik automatically adds the values when onSubmit is called
    const { username, password } = values

    try {
      const data = await signIn({ username, password })
      navigate('/')
      console.log('signIn data', data)
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
