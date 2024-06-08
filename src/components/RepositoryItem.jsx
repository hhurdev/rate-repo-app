import { View, StyleSheet, Image } from 'react-native'
import theme from '../../theme'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  color: {
    color: theme.colors.textPrimary,
  },
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  nameContainer: {
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  languageTagContainer: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    alignSelf: 'flex-start',
    padding: 5,
  },
  languageTag: {
    color: 'white',
  },
  dataContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  dataBlock: {
    alignItems: 'center',
  },
  textMargin: {
    marginBottom: 10,
  },
  dataText: {
    marginBottom: 5,
  },
})

const parseNumbers = (number) => {
  if (number >= 1000) {
    const rounded = (number / 1000).toFixed(1)
    return `${rounded}k`
  }

  return `${number}`
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/avatar-placeholder.jpeg')}
        />
        <View style={styles.nameContainer}>
          <Text
            style={styles.textMargin}
            fontWeight="bold"
            fontSize="subheading"
          >
            {item.fullName}
          </Text>
          <Text style={styles.textMargin}>{item.description}</Text>
          <View style={styles.languageTagContainer}>
            <Text style={styles.languageTag}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataBlock}>
          <Text fontWeight="bold" style={styles.dataText}>
            {parseNumbers(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.dataBlock}>
          <Text fontWeight="bold" style={styles.dataText}>
            {parseNumbers(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.dataBlock}>
          <Text fontWeight="bold" style={styles.dataText}>
            {parseNumbers(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.dataBlock}>
          <Text fontWeight="bold" style={styles.dataText}>
            {parseNumbers(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
