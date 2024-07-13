import { Route, Routes } from 'react-router-native'
import { View } from 'react-native'

import AppBar from './AppBar'
import SignIn from './SignIn'
import RepositoryList from './RepositoryList'
import SingleRepository from './SingleRepository'
import CreateReviewForm from './CreateReviewForm'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e1e4e8' }}>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<CreateReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  )
}

export default Main
