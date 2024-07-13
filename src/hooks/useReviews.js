import { useQuery } from '@apollo/client'
import { GET_REVIEWS } from '../graphql/queries'
import useAuthStorage from './useAuthStorage'

const useReviews = ({ id }) => {
  const { data, error, loading } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
    onError: (error) => {
      if (error.graphQLErrors)
        console.log('GraphQL Errors:', error.graphQLErrors)
      if (error.networkError) console.log('Network Error:', error.networkError)
    },
  })

  return {
    reviews: data ? data.repository.reviews.edges.map((edge) => edge.node) : [],
    error,
    loading,
  }
}

export default useReviews
