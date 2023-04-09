import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator color="grey" size={30} />
      <Text>Cargando...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
