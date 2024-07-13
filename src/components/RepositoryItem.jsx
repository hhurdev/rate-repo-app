import { View, StyleSheet, Image, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as Linking from 'expo-linking'

import theme from '../../theme'
import Text from './Text'

// TODO: Move some of the styles to themes?

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
  gitHubLinkButton: {
    backgroundColor: '#0366d6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    marginTop: 15,
  },
  boldWhiteText: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textWhite,
  },
})

const parseNumbers = (number) => {
  if (number >= 1000) {
    const rounded = (number / 1000).toFixed(1)
    return `${rounded}k`
  }

  return `${number}`
}

const onPress = (item, navigate) => {
  console.log(`RepositoryItem ${item.id} pressed`)
  navigate(`/repository/${item.id}`)
}

const RepositoryItem = ({ item, showGitHubButton }) => {
  const navigate = useNavigate()

  const openGitHubPage = (event) => {
    // ettei paina sitä ylempää pressablea (joka avaa yksittäisen repon)
    event.stopPropagation()
    Linking.openURL(item.url).catch((error) =>
      console.log('error opening the link: ', error)
    )
  }

  return (
    <Pressable onPress={() => onPress(item, navigate)}>
      <View testID="repositoryItem" style={styles.container}>
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
        {showGitHubButton && (
          <Pressable onPress={openGitHubPage}>
            <View style={styles.gitHubLinkButton}>
              <Text style={styles.boldWhiteText}>Open in GitHub</Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  )
}

export default RepositoryItem
