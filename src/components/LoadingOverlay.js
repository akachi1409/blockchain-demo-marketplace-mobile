import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function LoadingOverlay() {
  return (
    <View style={styles.indicatorOverlay}>
      <View style={styles.indicatorBackground}></View>
      <SkypeIndicator color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorOverlay: {
    position: 'absolute',
    left: 0,
    top: -100,
    width: width,
    height: height + 100,
    zIndex: 10000,
  },

  indicatorBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default LoadingOverlay;
