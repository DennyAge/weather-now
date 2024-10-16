import axios from 'axios';
import { ApiUrl } from '@/variables';

const actions = {
  async fetchWeather( { commit, state }, { location, index } ) {
    commit( 'SET_LOADING', true );
    const lang = localStorage.getItem( 'language' );

    try {
      const { lat, lon } = location.coord;
      const { weather, hourlyData, dailyData } = await fetchWeatherData( lat, lon, lang );

      const weatherId = weather.id;
      const existingIndex = state.weatherList.findIndex( w => w.id === weatherId );

      if ( existingIndex !== -1 ) {
        alert( 'This city is already added.' );
      } else {
        commit( 'SET_WEATHER', { weather, hourlyData, dailyData, weatherId, index } );
      }
    } catch ( error ) {
      console.error( 'Error fetching weather data:', error );
    } finally {
      commit( 'SET_LOADING', false );
    }
  },

  async fetchWeatherByGeolocation( { commit } ) {
    commit( 'SET_LOADING', true );
    const lang = localStorage.getItem( 'language' );

    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        async ( position ) => {
          const { latitude, longitude } = position.coords;

          try {
            const { weather, hourlyData, dailyData } = await fetchWeatherData( latitude, longitude, lang );
            commit( 'SET_WEATHER', { weather, hourlyData, dailyData, index: 0 } );
          } catch ( error ) {
            console.error( 'Error fetching weather data by geolocation:', error );
          } finally {
            commit( 'SET_LOADING', false );
          }
        },
        ( error ) => {
          console.error( 'Error getting geolocation:', error );
          commit( 'SET_LOADING', false );
        }
      );
    } else {
      alert( 'Geolocation is not supported by your browser.' );
      commit( 'SET_LOADING', false );
    }
  },

  async updateWeather( { commit, state } ) {
    const lang = localStorage.getItem( 'language' );

    try {
      for ( const location of state.weatherList ) {
        const { lat, lon } = location.coord;
        const { weather, hourlyData, dailyData } = await fetchWeatherData( lat, lon, lang );
        const index = state.weatherList.findIndex( w => w.id === weather.id );

        commit( 'SET_WEATHER', { weather, hourlyData, dailyData, index } );
        const isFavorite = state.favorites.some( fav => fav.id === weather.id );
        if ( isFavorite ) {
          const favoriteIndex = state.favorites.findIndex( fav => fav.id === weather.id );
          if ( favoriteIndex !== -1 ) {
            commit( 'SET_WEATHER', {
              weather,
              hourlyData,
              dailyData,
              index: favoriteIndex
            } );
          }
        }
      }
    } catch ( error ) {
      console.error( 'Error updating weather data:', error );
    }
  },

  startWeatherUpdates( { dispatch } ) {
    setInterval( () => {
      dispatch( 'updateWeather' );
    }, 10 * 60 * 1000 );
  },

  addNewWeatherCard( { commit, state } ) {
    if ( state.weatherList.length < 5 ) {
      const newCity = {
        name: '',
        coord: { lat: 0, lon: 0 },
        favorite: false,
        hourlyData: [],
        addToList: true,
        id: new Date()
      };
      commit( 'ADD_NEW_WEATHER_CARD', newCity );
    } else {
      alert( 'Максимум можно добавить 5 городов. Что бы добавить другой город удалите какой то' );
    }
  },

  removeWeatherCard( { commit }, city ) {
    commit( 'REMOVE_WEATHER_CARD', city );
  },

  addToFavorites( { commit, state }, city ) {
    if ( state.favorites.length < 5  ) {
      commit( 'ADD_TO_FAVORITES', city );
    } else {
      alert( 'Максимум можно добавить 5 городов в избранное. Что бы добавить другой город удалите какой то' );
    }
  },

  removeFromFavorites( { commit }, city ) {
    commit( 'REMOVE_FROM_FAVORITES', city );
  },
};

async function fetchWeatherData( lat, lon, lang ) {
  const weatherResponse = await axios.get(
    `${ ApiUrl }/data/2.5/weather?lat=${ lat }&lon=${ lon }&units=metric&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }`
  );

  const weather = weatherResponse.data;

  const forecastResponse = await axios.get(
    `${ ApiUrl }/data/2.5/forecast?lat=${ lat }&lon=${ lon }&units=metric&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }`
  );

  const hourlyData = forecastResponse.data.list.slice( 0, 8 ).map( item => ( {
    hour: new Date( item.dt_txt ).getHours(),
    temp: item.main.temp,
    wind: item.wind.speed,
    weather: item.weather[0].description,
  } ) );

  const dailyData = {};
  forecastResponse.data.list.forEach( item => {
    const date = new Date( item.dt_txt ).toLocaleDateString( lang, { weekday: 'long', day: 'numeric', month: 'long' } );
    if ( !dailyData[date] ) {
      dailyData[date] = {
        date: item.dt,
        hour: new Date( item.dt_txt ).getHours(),
        temp: item.main.temp,
        wind: item.wind.speed,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        weather: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    } else {
      dailyData[date].tempMin = Math.min( dailyData[date].tempMin, item.main.temp_min );
      dailyData[date].tempMax = Math.max( dailyData[date].tempMax, item.main.temp_max );
    }
  } );

  return { weather, hourlyData, dailyData };
}

export default actions;
