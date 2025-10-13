import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import DashboardCard from './DashboardCard';
import { useGetServiceTemplates } from '../hooks/useGetServiceTemplates';

const DashboardScreen: React.FC = () => {
  const { data, isLoading, isError } = useGetServiceTemplates({ sortOrder: 'asc', limit: 8, page: 1, search: '' });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text>Loading services...</Text>
      </View>
    );
  }
  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Error fetching services</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <DashboardCard
            name={item.name}
            image={item.image}
            description={item.description}
            link={item.link}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardScreen;
