import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue(textValue, 800);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Burcar pokemon"
          style={styles.textIput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  textBackground: {
    backgroundColor: '#f1f3f1',
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textIput: {
    flex: 1,
    fontSize: 18,
  },
});
