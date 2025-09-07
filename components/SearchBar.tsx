import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
interface props {
 placeholder:string ;
 onPress?:()=>void ;
}
const SearchBar = ({placeholder, onPress} :props) => {
  return (
    <View className='flex-row items-center rounded-full px-5 py-1 mt-10 border-2 bg-gray-200 border-gray-400 ml-4 mr-4'>
     <Image 
     source={icons.search} className='size-6 ' resizeMode='contain'  tintColor='#808080'
     />
     <TextInput 
     onPress={onPress}
     placeholder={placeholder}
     value=''
     onChangeText={()=>{}}
     placeholderTextColor='#808080'
     className='flex-1 ml-3 text-white'
     />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})