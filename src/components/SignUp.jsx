import { View, StyleSheet, Pressable } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'

import CustomTextInput from './CustomTextInput'
import theme from '../../theme'
import Text from './Text'
import useCreateUser from '../hooks/useCreateUser'
import useSignIn from '../hooks/useSignIn'

//TODO: use theme for most of these css
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  signUpButton: {
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

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(5, 'Username needs to be at least 5 characters')
      .max(30, 'Username needs to be under 30 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password needs to be at least 5 characters')
      .max(50, 'Password needs to be under 50 characters'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Password confirmation is required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder={'Username'}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={formik.touched.username && formik.errors.username}
      />
      <CustomTextInput
        placeholder={'Password'}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.touched.password && formik.errors.password}
        secureTextEntry
      />
      <CustomTextInput
        placeholder={'Password confirmation'}
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        error={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        secureTextEntry
      />
      <Pressable style={styles.signUpButton} onPress={formik.handleSubmit}>
        <Text style={styles.boldWhiteText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [createUser, createUserResult] = useCreateUser()
  const [signIn, signInResult] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const createUserInput = {
      username: values.username,
      password: values.password,
    }

    console.log('submitting ', createUserInput)
    try {
      await createUser(createUserInput)
      console.log('User created successfully')
    } catch (err) {
      console.error('Error in creating user:', err)
      return
    }

    try {
      await signIn({
        username: values.username,
        password: values.password,
      })
      navigate('/')
      console.log('Signed in successfully')
    } catch (err) {
      console.error('Error in signing in:', err)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
