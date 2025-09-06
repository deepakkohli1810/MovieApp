export const OMDB_CONFIG = {
  BASE_URI: "https://www.omdbapi.com",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API,
};

export interface OMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
}

export interface OMDBSearchResponse {
  Search: OMDBMovie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface OMDBMovieDetail {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating: string;
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  Rated: string;
}

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    // Validate API key
    if (!OMDB_CONFIG.API_KEY) {
      throw new Error('OMDB API key is missing. Please check your .env file.');
    }

    // Use default query if none provided
    const searchQuery = query.trim() || 'comedy';
    const endpoint = `${OMDB_CONFIG.BASE_URI}/?s=${encodeURIComponent(searchQuery)}&apikey=${OMDB_CONFIG.API_KEY}&type=movie`;

    console.log('Fetching movies with query:', searchQuery);
    console.log('API Key exists:', !!OMDB_CONFIG.API_KEY);

    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle OMDb specific errors
    if (data.Response === "False") {
      console.warn('OMDb API Error:', data.Error);
      return []; // Return empty array instead of throwing for better UX
    }

    return data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // Re-throw for your useFetch hook to handle
  }
};
