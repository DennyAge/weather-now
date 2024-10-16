const state = {
  weather: null,
  weatherList: JSON.parse( localStorage.getItem( 'weatherList' ) ) || [],
  favorites: JSON.parse( localStorage.getItem( 'favoriteCities' ) ) || [],
  loading: false,
};
export default state;