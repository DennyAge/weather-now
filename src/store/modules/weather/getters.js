const getters = {
  isLoading: ( state ) => state.loading,
  currentWeather: ( state ) => state.weather,
  weatherList: ( state ) => state.weatherList,
  favorites: ( state ) => state.favorites,
};

export default getters;