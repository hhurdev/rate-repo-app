import AppBarTab from "./AppBarTab";
import { ScrollView, StyleSheet, View } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Constants.statusBarHeight + 20,
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#cd7f5f'
  }
})

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <ScrollView horizontal>
        <AppBarTab content='Repositories' path='/' />
        <AppBarTab content='Sign in' path='/login' />
      </ScrollView>
    </View>
  )
};

export default AppBar;