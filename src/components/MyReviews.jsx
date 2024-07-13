import { FlatList, View, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import { useLoggedInStatus } from '../hooks/useLoggedInStatus'

import Text from './Text'
import ReviewItem from './ReviewItem'
import useUserReviews from '../hooks/useUserReviews'
import theme from '../../theme'
import useDeleteReview from '../hooks/useDeleteReview'

const styles = {
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 0,
  },
  button: {
    backgroundColor: '#237fb7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    color: 'white',
    flexGrow: 1,
  },
  buttonRight: {
    marginLeft: 10,
    backgroundColor: theme.colors.accentOrange,
  },
}

const DetailButtons = ({ openGitHubPage, handleDeleteReview }) => {
  return (
    <View style={styles.buttons}>
      <Pressable
        style={[styles.button, styles.buttonLeft]}
        onPress={openGitHubPage}
      >
        <Text style={{ color: 'white' }}>View Repository</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonRight]}
        onPress={handleDeleteReview}
      >
        <Text style={{ color: 'white' }}>Delete Review</Text>
      </Pressable>
    </View>
  )
}

const MyReviews = () => {
  const { isLoggedIn } = useLoggedInStatus()
  const { reviews, loading, error, refetch } = useUserReviews()
  const [deleteReview, deleteReviewResult] = useDeleteReview()

  // the next two prevent the app from crashing when the user is not logged in
  // kaatui jos kirjautui ulos my reviews -sivulla
  // useUserReviews ei nyt palauta mitään jos ei ole kirjautunut sisään
  // quick fix mutta olkoot
  if (!isLoggedIn) return <Text>Sign in to see your reviews</Text>
  if (!reviews || reviews.length === 0) return <Text>No reviews found</Text>
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const openGitHubPage = (item, event) => {
    const url = item.repository.url
    // ettei paina sitä ylempää pressablea (joka avaa yksittäisen repon)
    event.stopPropagation()
    Linking.openURL(url).catch((error) =>
      console.log('error opening the link: ', error)
    )
  }

  const handleDeleteReview = async (item, event) => {
    const reviewId = item.id
    try {
      const result = await deleteReview(reviewId)
      console.log(' deletion result ', result)
      if (result.success) {
        console.log('Review deleted successfully')
        refetch()
      } else {
        console.error('Failed to delete review:', result.error)
      }
    } catch (error) {
      console.error('Error in deleting review:', error)
    }
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <DetailButtons
            openGitHubPage={(event) => {
              openGitHubPage(item, event)
            }}
            handleDeleteReview={(event) => {
              handleDeleteReview(item, event)
            }}
          />
        </>
      )}
      keyExtractor={({ id }) => id}
    />
  )
}

export default MyReviews
