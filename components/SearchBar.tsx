import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
interface props {
 placeholder:string ;
 onPress?:()=>void ;
}
const SearchBar = ({placeholder, onPress} :props) => {
  return (
    <View className='flex-row items-center rounded-full px-5 py-4 '>
     <Image 
     source={icons.search} className='size-6 ' resizeMode='contain'  tintColor='#ab8bff'
     />
     <TextInput 
     onPress={onPress}
     placeholder={placeholder}
     value=''
     onChangeText={()=>{}}
     placeholderTextColor='#ab8bff'
     className='flex-1 ml-3 text-white'
     />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})