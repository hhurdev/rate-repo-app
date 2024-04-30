import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';

import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutralBlueOpacity,
    //opacity: 0.5,
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
});

const AppBarTab = ({ content }) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <Text fontWeight='bold'>{ content }</Text>
      </View>
    </Pressable>
  )
}

export default AppBarTab