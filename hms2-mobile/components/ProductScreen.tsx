import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGetProducts } from '../hooks/useGetProducts';
import ProductCard from './ProductCard';
import { useLocalSearchParams } from 'expo-router';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import { Ionicons } from '@expo/vector-icons';

export default function ProductScreen() {
  const { categoryId, serviceId } = useLocalSearchParams();
  const { data, isLoading, isError } = useGetProducts({ categoryId: String(categoryId), serviceId: String(serviceId), limit: 8, page: 1 });
  const { addToCart, cart } = useCart();
  const [cartVisible, setCartVisible] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text>Loading products...</Text>
      </View>
    );
  }
  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Error fetching products</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartIcon} onPress={() => setCartVisible(true)}>
        <Ionicons name="cart" size={28} color="#6366F1" />
        {cart.length > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cart.length}</Text></View>}
      </TouchableOpacity>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.images[0],
                quantity: 1,
                hotelId: item.hotelId,
              })
            }
          />
        )}
      />
      <CartModal visible={cartVisible} onClose={() => setCartVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
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
  cartIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    marginLeft: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  cartBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
