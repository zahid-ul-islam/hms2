import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetCategoryTemplates } from '../../hooks/useGetCategoryTemplates';
import CategoryCard from '../../components/CategoryCard';

export default function CategoryScreen() {
  const { serviceId } = useLocalSearchParams();
  const { data, isLoading, isError } = useGetCategoryTemplates({ serviceId: String(serviceId), limit: 100, page: 1 });
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    router.push({ pathname: '/product', params: { categoryId, serviceId } });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text>Loading categories...</Text>
      </View>
    );
  }
  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Error fetching categories</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <CategoryCard
            name={item.name}
            image={item.images[0]}
            onPress={() => handleCategoryPress(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    gap: 12,
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});





