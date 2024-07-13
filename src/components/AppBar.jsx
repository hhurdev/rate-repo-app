import AppBarTab from './AppBarTab'
import { ScrollView, StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'

import { useLoggedInStatus } from '../hooks/useLoggedInStatus'
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

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <AppBarTab content="Repositories" path="/" />
        {isLoggedIn && (
          <AppBarTab content="Create a review" path="/create-review" />
        )}
        {isLoggedIn ? (
          <>
            <AppBarTab content="My reviews" path="/my-reviews" />
            <SignOutTab />
          </>
        ) : (
          <AppBarTab content="Sign In" path="/login" />
        )}
        {!isLoggedIn && <AppBarTab content="Sign up" path="/signup" />}
      </ScrollView>
    </View>
  )
}

export default AppBar
