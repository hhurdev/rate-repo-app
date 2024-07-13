import { useParams } from 'react-router-native'
import { FlatList, View } from 'react-native'

import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import useReviews from '../hooks/useReviews'
import Text from './Text'
import ReviewItem from './ReviewItem'

const RepositoryInfo = ({ repository, loading, error }) => {
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const item = repository ? repository : null

  return <RepositoryItem item={item} showGitHubButton />
}

const SingleRepository = () => {
  const { id } = useParams()
  const {
    repository,
    loading: repositoryLoading,
    error: repositoryError,
  } = useRepository({ id })
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useReviews({ id })

  if (reviewsLoading || repositoryLoading) return <Text>Loading...</Text>
  if (reviewsError || repositoryError)
    return (
      <Text>
        Error: {reviewsError ? reviewsError.message : repositoryError.message}{' '}
      </Text>
    )

  const onEndReach = () => {
    console.log('You have reached the end of the list')
    // skipeti skip skip
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo
          repository={repository}
          loading={repositoryLoading}
          error={repositoryError}
        />
      )}
      onEndReached={onEndReach}
    />
  )
}

export default SingleRepository
