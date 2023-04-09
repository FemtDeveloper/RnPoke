import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {RootStackParams} from '../navigator/Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemons} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {collor, simplePokemon} = route.params;
  const {isLoading, pokemon} = usePokemons(simplePokemon.id);

  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      <View style={{...styles.headerContainer, backgroundColor: collor}}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 5}}>
          <Icon name="arrow-back-outline" color={'white'} size={30} />
        </TouchableOpacity>
        <Text style={{...styles.pokemonName, top: top + 30}}>
          {simplePokemon.name + '\n'} # {simplePokemon.id}
        </Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{...styles.pokeBall}}
        />
        <FadeInImage uri={simplePokemon.picture} style={styles.pokemonImage} />
      </View>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size={30} color={collor} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeBall: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
