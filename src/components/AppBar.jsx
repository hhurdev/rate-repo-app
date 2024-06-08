import AppBarTab from './AppBarTab'
import { ScrollView, StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import { useNavigate } from 'react-router-native'

import { useLoggedInStatus } from '../hooks/useLoggedInStatus'
import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'
import Text from './Text'
import SignOutTab from './SignOutTab'

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Constants.statusBarHeight + 20,
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#cd7f5f',
  },
})

const AppBar = () => {
  const { loading, error, isLoggedIn } = useLoggedInStatus()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const handleSignOut = async () => {
    console.log('signing out')
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    navigate('/')
  }

  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <AppBarTab content="Repositories" path="/" />
        {isLoggedIn ? (
          <SignOutTab />
        ) : (
          <AppBarTab content="Sign In" path="/login" />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
