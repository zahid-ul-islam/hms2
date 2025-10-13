import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Button
        title="Previous"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pages.map((page) => (
        <Text
          key={page}
          style={[styles.page, currentPage === page && styles.activePage]}
          onPress={() => onPageChange(page)}
        >
          {page}
        </Text>
      ))}
      <Button
        title="Next"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  page: {
    marginHorizontal: 4,
    fontSize: 16,
    color: '#6366F1',
    padding: 4,
  },
  activePage: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#6366F1',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
});

export default Pagination;




