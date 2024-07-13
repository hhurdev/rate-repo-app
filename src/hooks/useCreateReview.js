import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  /* result:
    object containing loading, error and data returned by the mutation
  */
  // called when the component mounts and it prepares the mutation
  // returns the function that you can then call later so no server calls at this point
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log('Some error in creating review', error)
    },
  })

  const createReview = async (createReviewInput) => {
    try {
      const { data } = await mutate({
        variables: {
          review: createReviewInput,
        },
      })
      return data
    } catch (error) {
      console.error('Error creating review:', error)
      return { error }
    }
  }

  return [createReview, result]
}

export default useCreateReview
