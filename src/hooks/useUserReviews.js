import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import { useLoggedInStatus } from '../hooks/useLoggedInStatus'

const useUserReviews = () => {
  console.log('fetching reviews for current user')
  const { isLoggedIn } = useLoggedInStatus()

  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    skip: !isLoggedIn,
    variables: { includeReviews: true },
    onError: (error) => {
      console.log('error fetching reviews for user: ', error)
    },
  })

  return {
    reviews: data ? data.me.reviews.edges.map((edge) => edge.node) : [],
    error,
    loading,
    refetch,
  }
}

export default useUserReviews
