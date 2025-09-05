import { ActivityIndicator, FlatList, Image, ScrollView, Text, View  } from "react-native";
import {Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from 'expo-router'
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";



export default function App() {
const router = useRouter();  
const {data:movies , loading:movieLoading , error:movieErrors} =useFetch(()=> fetchMovies({query : ''}))

  return (
   <View className="flex-1 ">

<Image source={images.bg} className="absolute w-full z-0 " />
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight : '100%' , paddingBottom:10                                                      }} className="flex-1 px-5">
  <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto  "  />

{
  movieLoading ? (
    <ActivityIndicator 
    size='large' 
    color="#000ff"
    className="mt-10 self-center"
    />
  ) : movieErrors ? (
    <Text>Error : {movieErrors?.message} </Text>
  ):(
     <View className="flex-1 mt-5  ">
      <SearchBar 
      onPress={()=> router.push("/search")}
      placeholder= "Search for a movie "
      
      />

      <>
      <Text  className="flex-1 mt-5 font-bold mb-5 text-lg  ">Latest Movies</Text>

      <FlatList 
      data={movies}
      renderItem={({item}) =>(
        <Text className="text-black">{item.title}</Text>
      )}
      />
      </>
  </View>
  )
}

</ScrollView>
   </View>
  );
}
