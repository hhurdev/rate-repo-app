import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    //backgroundColor: theme.colors.neutralBlueOpacity,
    //backgroundColor: 'blue',
    //opacity: 0.5,
    
    paddingBottom: 20,
    paddingLeft: 10,
    marginRight: 10,
  },
});

const AppBarTab = ({ content, path }) => {
  return (
    <Pressable style={styles.container}>
        <Link to={path}>
          <Text fontWeight='bold' color='white'>{ content }</Text>
        </Link>
    </Pressable>
  )
}

export default AppBarTab