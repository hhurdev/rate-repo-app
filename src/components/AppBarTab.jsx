import { StyleSheet, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    //backgroundColor: theme.colors.neutralBlueOpacity,
    //backgroundColor: 'blue',
    //opacity: 0.5,

    paddingBottom: 20,
    paddingLeft: 10,
    marginRight: 10,
  },
})

const AppBarTab = ({ content, path, onPress }) => {
  const contentElement = (
    <Text fontWeight="bold" color="white">
      {content}
    </Text>
  )

  const pressableProps = onPress ? { onPress } : {}

  return (
    <Pressable {...pressableProps} style={styles.container}>
      {onPress ? contentElement : <Link to={path}>{contentElement}</Link>}
    </Pressable>
  )
}

export default AppBarTab
