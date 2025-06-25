// components/CrossPlatformSlider.js

import { Platform, StyleSheet, View } from 'react-native';

export default function CrossPlatformSlider(props) {
  const { style, value, minimumValue, maximumValue, step, onValueChange, ...rest } = props;

  if (Platform.OS === 'web') {
    // slider HTML pour le web
    return (
      <View style={[styles.webWrapper, style]}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={step || 1}
          value={value}
          onChange={e => onValueChange(Number(e.target.value))}
          style={styles.webSlider}
          {...rest}
        />
      </View>
    );
  }

  // slider natif pour mobile
  const Slider = require('@react-native-community/slider').default;
  return (
    <Slider
      style={style}
      value={value}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      onValueChange={onValueChange}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    width: '100%',
  },
  webSlider: {
    width: '100%',
    height: 40,
  },
});
