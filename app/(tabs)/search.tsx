import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'

interface SearchProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
}
const search = ({placeholder , onPress , value}: SearchProps) => {
  const  [searchQuery, setSearchQuery] = useState('') ;
  
  const { data: movies, loading: movieLoading, error: movieErrors } = useFetch(() => fetchMovies({ query: searchQuery }), false);
   


  return (
    <View className='flex-1 '>
    <Image
    source={images.bg}
    className='flex-1 absolute w-full z-0 ' resizeMode='cover'
    />

    {movies && movies.length > 0 ? (
                <FlatList 
                  data={movies}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.imdbID.toString()}
                  numColumns={3}
                  columnWrapperStyle={{ 
                    justifyContent: "space-between",
                    marginBottom: 0, 
                    padding:20,
                    marginVertical:16
                  }}
                  contentContainerStyle={{paddingBottom:100}}
                  ListHeaderComponent={ 
                    <>
                    <View className='w-full flex-row justify-center items-center mt-20 '>
                         <Image
                         source={icons.logo}
                         />
                    </View>
                    <View className='my-5'>
                     <SearchBar 
                     placeholder="Seach for a movie" 
                     value={searchQuery}
                     onChangeText={(text) => setSearchQuery(text)}

                     />
                     {!movieLoading && ! movieErrors && searchQuery.trim() && movies?.length >0 && 
                  <Text className='text-xl text-gray-700 font-bold px-6 mt-3 '>

                    Search Results for {''}
                    <Text className='text-accent'> 
                      {searchQuery}
                    </Text>
                  </Text>
                    
                  }
                    </View>

                   
  
                    </>
                  }
                  renderItem={({ item }) => (
                   <MovieCard 
  imdbID={item.imdbID}
  Title={item.Title}
  Poster={item.Poster}
  Year={item.Year}
  Type={item.Type}
  imdbRating={item.imdbRating}
  Genre={item.Genre}
  Rated={item.Rated}
/>
                  )}
                />
              ) : (
               <View className='mt-10'>
                
                    {movieLoading && (
                      <ActivityIndicator  size='large' color="#0000ff" className='my-3' />
                    )}

                {movieErrors && (
                    <Text className='text-red-500 px-5 my-3'>
                      Error: {movieErrors.message}
                    </Text>
                  )}

                  
               </View>
              )}
    </View>
  )
}

export default search

const styles = StyleSheet.create({})