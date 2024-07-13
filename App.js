import { NativeRouter } from 'react-router-native'
import { ApolloProvider } from '@apollo/client'
import Constants from 'expo-constants'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'
import SortingStorage from './src/utils/sortingStorage'
import SortingContext from './src/contexts/SortingContext'

const authStorage = new AuthStorage()
const sortingStorage = new SortingStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  console.log('Constants', Constants.expoConfig.extra.env)
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <SortingContext.Provider value={sortingStorage}>
              <Main />
            </SortingContext.Provider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}

export default App
