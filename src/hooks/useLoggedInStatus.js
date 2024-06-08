import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

export const useLoggedInStatus = () => {
  const { loading, error, data } = useQuery(ME, {
    onError: (error) => {
      console.log('Error in ME query', error)
    },
  })

  // !! is a way to convert the value to a boolean
  // one ! converts the value to a boolean and negates it the second ! inverts it
  // if data.me is undefined, then isLoggedIn is false, otherwise true
  const isLoggedIn = !!data?.me

  return { loading, error, isLoggedIn }
}
