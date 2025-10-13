import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import DashboardCard from '../../components/DashboardCard';
import { useGetServiceTemplates } from '../../hooks/useGetServiceTemplates';
import { useRouter } from 'expo-router';

export default function ServicesScreen() {
  const { data, isLoading, isError } = useGetServiceTemplates({ sortOrder: 'asc', limit: 100, page: 1 });
  const router = useRouter();

  const handleServicePress = (serviceId: string) => {
    router.push({ pathname: '/categories/[serviceId]', params: { serviceId } });
  };

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
      <Text style={styles.title}>Our Services</Text>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DashboardCard
            name={item.name}
            image={item.image}
            description={item.description}
            link={item.link}
            onPress={() => handleServicePress(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
