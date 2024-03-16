import * as React from 'react'
import { useGetPokemonByNameQuery } from './Pokemon'
import { Image, Text, View } from 'react-native'

export default function screen() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('pikachu')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <View>
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          <Text>{data.species.name}</Text>
          <Image src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </View>
  )
}