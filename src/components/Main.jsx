import { FlatList, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryItem from './RepositoryItem';
import SignIn from './SignIn'
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const repoList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  return (
    <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <RepositoryItem item={item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        // other props
      />
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const onSubmit = () => {
  console.log('Form has been submitted')
}

const RepositoryList = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e1e4e8' }}>
      <AppBar></AppBar>
      <Routes>
        <Route path='/' element={repoList()} />
        <Route path='/login' element={ <SignIn handleSubmit={onSubmit} /> } />
      </Routes>
    </View>
  );
};

export default RepositoryList;