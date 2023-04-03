import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Layout, Card, Text } from '@ui-kitten/components';

const BookList = ({ books }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.bookContainer}>
      {item.thumbnail && (
        <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
      )}
      <Layout style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.authors}>
          {item.authors && item.authors.join(", ")}
        </Text>
      </Layout>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    marginTop: 16,
  },
  bookContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 16,
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  authors: {
    fontSize: 14,
    color: "#777",
  },
});

export default BookList;
