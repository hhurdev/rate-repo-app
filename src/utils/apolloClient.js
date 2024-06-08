import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'

/* 
Do not try to access environment variables like process.env.APOLLO_URI
outside the app.config.js file.
Instead use the Constants.expoConfig.extra object */

const { apolloUri } = Constants.expoConfig.extra

const httpLink = createHttpLink({
  uri: apolloUri,
})

const createApolloClient = (authStorage) => {
  // setContext takes a function as a parameter that returns an object
  // called with operation (skipped) and previous context deconstructed
  //
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
      }
    }
  })

  return new ApolloClient({
    // needs an httpLink which is created above
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
