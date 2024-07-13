import { Pressable, View, StyleSheet } from 'react-native'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-native'

import theme from '../../theme'
import Text from './Text'
import useCreateReview from '../hooks/useCreateReview'
import CustomTextInput from './CustomTextInput'

//TODO: move hardcoded colors to theme
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  submitButton: {
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository ownerName is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot be more than 100')
    .required('Rating is required'),
  text: yup.string(),
})

const CreateReviewContainer = ({ onSubmit }) => {
  //TODO: reformat and remove repetition
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        error={formik.touched.ownerName && formik.errors.ownerName}
      />
      <CustomTextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        error={formik.touched.repositoryName && formik.errors.repositoryName}
      />
      <CustomTextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        error={formik.touched.rating && formik.errors.rating}
      />
      <CustomTextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        error={formik.touched.text && formik.errors.text}
      />
      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.boldWhiteText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReviewForm = () => {
  const [createReview, result] = useCreateReview()
  const navigate = useNavigate()

  // the rating should be checked to be numeric, but I'll assume it would be
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    const createReviewInput = {
      ownerName,
      repositoryName,
      rating: parseInt(rating, 10),
      text,
    }

    try {
      const data = await createReview(createReviewInput)
      const id = data.createReview.repository.id
      navigate(`/repository/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReviewForm
