import { FlatList, View, StyleSheet } from 'react-native'
import React from 'react'
import { Route, Routes } from 'react-router-native'

import AppBar from './AppBar'
import RepositoryItem from './RepositoryItem'
import SignIn from './SignIn'
import Text from './Text'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const RepoList = () => {
  const { repositories, error, loading } = useRepositories()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      style={{ flex: 1 }}
      // other props
    />
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e1e4e8' }}>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </View>
  )
}

export default Main
