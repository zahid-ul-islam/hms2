import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export interface ServiceFilterProps {
  onSearch: (search: string) => void;
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({ onSearch, onSortChange }) => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearchChange = (text: string) => {
    setSearch(text);
    onSearch(text);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    onSortChange(order);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search services..."
        value={search}
        onChangeText={handleSearchChange}
      />
      <View style={styles.sortRow}>
        <Button
          title="Sort Asc"
          onPress={() => handleSort('asc')}
          color={sortOrder === 'asc' ? '#6366F1' : '#888'}
        />
        <Button
          title="Sort Desc"
          onPress={() => handleSort('desc')}
          color={sortOrder === 'desc' ? '#6366F1' : '#888'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default ServiceFilter;




