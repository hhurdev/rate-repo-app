import { View } from 'react-native'

import theme from '../../theme'
import Text from './Text'

/* the styles work without StyleSheet.create
because React Native is designed to accept both plain
objects and objects created by StyleSheet.create */
const styles = {
  separator: {
    height: 10,
  },
  reviewItem: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    padding: 15,
    paddingTop: 20,
  },
  reviewContent: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 15,
    flexShrink: 1,
  },
  reviewRating: {
    borderColor: theme.colors.accentOrange,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 45 / 2,
    flexShrink: 0,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  createdAt: {
    marginBottom: 10,
  },
}

const formatDate = (date) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString()
}

const ReviewItem = ({ review }) => {
  const date = formatDate(review.createdAt)
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewRating}>
        <Text style={{ textAlign: 'center', color: theme.colors.accentOrange }}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.createdAt}>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
