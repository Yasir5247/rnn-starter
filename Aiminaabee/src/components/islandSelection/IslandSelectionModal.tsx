import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, RefreshControl, ActivityIndicator } from 'react-native';

import { RecyclerListView } from 'recyclerlistview';
import { dataProvider } from '../../utils/dataProvider';
import { LayoutUtil } from '../../utils/LayoutUtil';
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';

//components
import { AtollRow } from './AtollRow';

import { GET_ISLANDS } from '../../requests/users';
const LIMIT = 50;

export const IslandSelectionModal: React.FC<any> = ({ onIslandSelectionRow }) => {
  const { loading, data, networkStatus, refetch, fetchMore } = useQuery(GET_ISLANDS, {
    variables: { limit: LIMIT, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const dataProviderWithData = useRef(dataProvider);

  if (data && data.getIslands) {
    dataProviderWithData.current = dataProviderWithData.current.cloneWithRows(data.getIslands);
  }

  const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(3));

  const _onEndReached = () => {
    if (networkStatus !== NetworkStatus.fetchMore && dataProviderWithData.current.getSize()) {
      fetchMore({
        variables: {
          limit: LIMIT,
          offset: dataProviderWithData.current.getSize(),
        },
        updateQuery: (pqr, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return pqr;
          }
          return {
            getIslands: [...pqr.getIslands, ...fetchMoreResult.getIslands],
          };
        },
      });
    }
  };

  const _rowRenderer = (type: any, data: any) => {
    return (
      <AtollRow
        islandId={data.id}
        islandName={data.name}
        atoll={data.atoll}
        isChecked={data.isChecked}
        onPressIsland={onIslandSelectionRow}
      />
    );
  };

  const _renderFooter = () => {
    return loading ? (
      <View>
        <ActivityIndicator style={{ margin: 5 }} size="large" color={'black'} />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Select Category</Text>
      </View>

      <RecyclerListView
        style={{ flex: 1 }}
        dataProvider={dataProviderWithData.current}
        onEndReached={_onEndReached}
        layoutProvider={layoutProvider}
        rowRenderer={_rowRenderer}
        renderFooter={_renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={() => refetch({ limit: LIMIT, offset: 0 })}
            colors={['#EA0000']}
            tintColor="white"
            title="loading..."
            titleColor="white"
            progressBackgroundColor="white"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerBox: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  catContainer: {
    borderTopWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  categoryRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#000',
    padding: 20,
  },
  categoryText: {
    fontSize: 18,
    color: '#000',
  },
  //breadCramp
  breadCrampRow: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
  },
  breadCrampText: {
    fontSize: 14,
    color: '#000',
  },
});
