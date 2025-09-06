import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from 'expo-router';
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";



export default function App() {
  const router = useRouter();  
  const { data: movies, loading: movieLoading, error: movieErrors } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 relative">
      {/* Background image - stays fixed behind everything */}
      <Image 
    source={images.bg} 
    className="absolute w-full   "
    style={{ zIndex: -1 }}
    resizeMode="cover"
  />
      
      {/* Content container - transparent background to show the image behind */}
      <View className="flex-1">
        {/* Logo at the top, centered */}
        <View className="w-full items-center mt-20">
          
          <Image 
            source={icons.logo} 
            className="w-12 h-10"
          />
        </View>

        {/* Scrollable content */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }} 
          className="flex-1 px-5"
        >
          {movieLoading ? (
            <ActivityIndicator 
              size='large' 
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : movieErrors ? (
            <View className="mt-10 items-center">
              <Text className="text-red-500 text-center">Error: {movieErrors?.message}</Text>
              <Text className="text-gray-500 text-center mt-2">
                Please check your API key and internet connection
              </Text>
            </View>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar 
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />

              <Text className="font-bold mb-5 text-lg mt-5">Latest Movies</Text>

              {movies && movies.length > 0 ? (
                <FlatList 
                  data={movies}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.imdbID.toString()}
                  numColumns={3}
                  columnWrapperStyle={{ 
                    justifyContent: "space-between",
                    marginBottom: 10 
                  }}
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
                <Text className="text-center text-gray-500 mt-10">
                  No movies found
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}


