import { icons } from '@/constants/icons';
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

interface OMDBMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
  imdbRating?:string ;
  Genre:string;
Rated?:string;
}

const MovieCard = ({ imdbID, Title, Poster, imdbRating, Genre, Rated ,Year}: OMDBMovie) => {


  //  console.log('Movie data:', {
  //   imdbID, Title, Poster, imdbRating, Genre, Rated 
  // });

    const renderRating = () =>{ if (!imdbRating || imdbRating === 'N/A' || imdbRating === 'null' || imdbRating === '') {
      return (
        <Text className='text-xs text-gray-400'>
          No rating
        </Text>
      );
    }
    
    const rating = parseFloat(imdbRating);
    if (isNaN(rating)) {
      return (
        <Text className='text-xs text-gray-400'>
          No rating
        </Text>
      );
    }
}
  return (
    <Link href={`/movies/${imdbID}`} asChild >
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={{ 
            uri: Poster && Poster !== 'N/A' 
              ? Poster 
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png' 
          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />
      <Text className='text-sm font-bold mt-1' numberOfLines={1} > {Title}</Text>
        <View className='flex-row items-center justify-start gap-x-1'>
          <Image
          source={icons.star}
          />
         <View className='flex-row items-center justify-start mt-1'>
          {renderRating()}
        
        </View>
        

       

        </View>
      
  <View className='flex-row items-center justify-start mt-1'>
     <Text className='text-sm text-gray-600'>
      Release :  {Year}
          </Text>
           </View>

      </TouchableOpacity>
      
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({})