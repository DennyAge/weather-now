import axios from 'axios';
import { ApiUrl } from '@/variables';


const actions = {
  async fetchWeather( { commit, state }, { location, index } ) {
    const lang = localStorage.getItem( 'language' );
    commit( 'SET_LOADING', true );
    try {
      const { lat, lon } = location.coord;

      const weatherResponse = await axios.get( `${ ApiUrl }/data/2.5/weather?lat=${ lat }&lon=${ lon }&units=metric&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }` );
      const weather = weatherResponse.data;
      const forecastResponse = await axios.get( `${ ApiUrl }/data/2.5/forecast?lat=${ lat }&lon=${ lon }&units=metric&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }` );

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
    const lang = localStorage.getItem( 'language' );
    commit( 'SET_LOADING', true );
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        async ( position ) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherResponse = await axios.get(
              `${ ApiUrl }/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&units=metric&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }`
            );
            const weather = weatherResponse.data;
            const forecastResponse = await axios.get(
              `${ ApiUrl }/data/2.5/forecast?lat=${ latitude }&lon=${ longitude }&units=metric&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }`
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
                  date: item.dt_txt,
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
      alert( 'Geolocation не поддерживается вашим браузером.' );
      commit( 'SET_LOADING', false );
    }
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
      alert( 'Максимум можно добавить 5 городов в избранное.' );
    }
  },

  removeWeatherCard( { commit }, city ) {
    commit( 'REMOVE_WEATHER_CARD', city );
  },
  addToFavorites( { commit }, city ) {
    commit( 'ADD_TO_FAVORITES', city );
  },
  removeFromFavorites( { commit }, city ) {
    commit( 'REMOVE_FROM_FAVORITES', city );
  },
};

export default actions;