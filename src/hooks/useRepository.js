import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = ({ id }) => {
  console.log('fetching repository with id ', id)
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
    onError: (error) => {
      if (error.graphQLErrors)
        console.log('GraphQL Errors:', error.graphQLErrors)
      if (error.networkError) console.log('Network Error:', error.networkError)
    },
  })

  return {
    repository: data ? data.repository : undefined,
    error,
    loading,
  }
}

export default useRepository
