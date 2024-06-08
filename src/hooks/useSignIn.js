import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'

import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  /* result:
    object containing loading, error and data returned by the mutation
  */
  // called when the component mounts and it prepares the mutation
  // returns the function that you can then call later so no server calls at this point
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log('Some error signing in', error)
    },
  })

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({ variables: { username, password } })
      await authStorage.setAccessToken(data.authenticate.accessToken)
      /* This will clear the Apollo Client's cache and re-execute all active queries. */
      apolloClient.resetStore()
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      return { error }
    }
  }

  return [signIn, result]
}

export default useSignIn
