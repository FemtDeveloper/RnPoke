import React from 'react';
import {ActivityIndicator, FlatList, Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {PokemonCard} from '../components/PokemonCard';
import {View} from 'react-native';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  console.log({simplePokemonList});
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <View style={{...styles.globalMargin, alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.globalMargin,
                ...styles.title,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10,
              }}>
              Pokedex
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} color={'grey'} size={22} />
          }
        />
      </View>
    </>
  );
};

export default HomeScreen;
