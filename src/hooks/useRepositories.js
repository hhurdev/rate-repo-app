import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  console.log('fetching repositories')
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    /*
    Tsekkaa cachen, jos on, palauttaa sen. Pyytää enivei palvelimelta uuden datan.
    */
    fetchPolicy: 'cache-and-network',
  })

  return {
    repositories: data ? data.repositories : undefined,
    error,
    loading,
  }
}

export default useRepositories
