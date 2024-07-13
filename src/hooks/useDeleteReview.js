import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log('Some error in deleting review', error)
    },
  })

  const deleteReview = async (deleteReviewId) => {
    console.log('deleting review ', deleteReviewId)
    try {
      const { data } = await mutate({
        variables: { deleteReviewId },
      })
      if (data) {
        console.log('trying to return success object')
        return { success: true, data }
      } else {
        return {
          success: false,
          error: 'No data returned from delete mutation',
        }
      }
    } catch (error) {
      console.error('Error deleting review:', error)
      return { success: false, error }
    }
  }

  return [deleteReview, result]
}

export default useDeleteReview
