import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CartModal({ visible, onClose }: CartModalProps) {
  const { cart, removeFromCart, placeOrder, addToCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal
      isVisible={visible}
      
      onBackdropPress={onClose}
    >
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 320 }}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>৳{item.price.toFixed(2)}</Text>
                <View style={styles.qtyRow}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => addToCart({ ...item, quantity: -1 })}
                    disabled={item.quantity <= 1}
                  >
                    <Ionicons name="remove-circle" size={22} color={item.quantity > 1 ? '#6366F1' : '#ccc'} />
                  </Pressable>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => addToCart({ ...item, quantity: 1 })}
                  >
                    <Ionicons name="add-circle" size={22} color="#6366F1" />
                  </Pressable>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                <Ionicons name="trash" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        />
        <View style={styles.stickyBar}>
          <Text style={styles.total}>Total: ৳{total.toFixed(2)}</Text>
          <TouchableOpacity
            style={[styles.orderBtn, cart.length === 0 && { backgroundColor: '#ccc' }]}
            onPress={() => placeOrder(onClose)}
            disabled={cart.length === 0}
          >
            <Text style={styles.orderBtnText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 18,
    paddingBottom: 0,
    minHeight: 200,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#E5E7EB',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6366F1',
    marginBottom: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  removeBtn: {
    marginLeft: 8,
    padding: 4,
  },
  stickyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 6,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  orderBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
    shadowColor: '#6366F1',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
});
