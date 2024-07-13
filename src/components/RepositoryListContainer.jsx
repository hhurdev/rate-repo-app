import React from 'react'
import { FlatList } from 'react-native'
import { View, StyleSheet } from 'react-native'

import RepositoryItem from './RepositoryItem'
import RepositoryListHeader from './RepositoryListHeader'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

export default class RepositoryListContainer extends React.Component {
  render() {
    const { repositories } = this.props
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <RepositoryListHeader
            searchKeyword={this.props.searchKeyword}
            handleSearch={this.props.handleSearch}
            selectedSortingOption={this.props.selectedValue}
            onSortingChange={this.props.onSortingChange}
          />
        }
      />
    )
  }
}
