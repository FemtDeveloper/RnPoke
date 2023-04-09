import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, Text, View} from 'react-native';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {FlatList} from 'react-native';
import {styles} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {TouchableWithoutFeedback} from 'react-native';
import {Keyboard} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const SearchScreen = () => {
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (!term || term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    <Loading />;
  }

  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          width: screenWidth - 40,
          position: 'absolute',
          zIndex: 999,
          top: Platform.OS === 'ios' ? top : top + 20,
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={pokemonFiltered}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.globalMargin,
                ...styles.title,
                paddingBottom: 10,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
