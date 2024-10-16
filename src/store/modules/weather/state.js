const state = {
  weather: null,
  weatherList: JSON.parse( localStorage.getItem( 'weatherList' ) ) || [],
  favorites: JSON.parse( localStorage.getItem( 'favorites' ) ) || [],
  loading: false,
};
export default state;