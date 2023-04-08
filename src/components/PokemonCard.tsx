import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigator/Navigator';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const windowWidth = Dimensions.get('window').width;

  const isMounted = useRef(true);

  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParams, 'PokemonScreen'>>();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
    }).then(colors => {
      if (!isMounted) return;
      colors.platform === 'android'
        ? setBgColor(colors.dominant || 'grey')
        : setBgColor(colors.platform || 'grey');
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigate('PokemonScreen', {simplePokemon: pokemon, collor: bgColor})
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'red',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // overflow: 'hidden',
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    left: 10,
    top: 20,
  },
  pokebola: {
    height: 100,
    width: 100,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -8,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
    opacity: 0.5,
  },
});
