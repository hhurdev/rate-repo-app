import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import useAuthStorage from '../hooks/useAuthStorage'
import AppBarTab from './AppBarTab'

const SignOutTab = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    console.log('signing out')
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    console.log('navigating to /')
    navigate('/')
  }

  return <AppBarTab content="Sign Out" onPress={handleSignOut} />
}

export default SignOutTab
