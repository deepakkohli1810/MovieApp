export const OMDB_CONFIG = {
  BASE_URI: "https://www.omdbapi.com",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API,
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${OMDB_CONFIG.BASE_URI}/?s=${encodeURIComponent(query)}&apikey=${OMDB_CONFIG.API_KEY}`
    : `${OMDB_CONFIG.BASE_URI}/?s=Avengers&apikey=${OMDB_CONFIG.API_KEY}`; 
    // OMDb doesn’t support discover/popularity; you must use a default search term

  const response = await fetch(endpoint, { method: "GET" });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data.Search || [];  
};
