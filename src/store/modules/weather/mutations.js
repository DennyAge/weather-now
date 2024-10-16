const mutations = {
  SET_LOADING( state, status ) {
    state.loading = status;
  },

  SET_WEATHER( state, { weather, hourlyData, dailyData, index } ) {
    const existingWeather = state.weatherList[index];
    const isFavorite = state.favorites.some( fav => fav.id === weather.id );

    const newWeatherData = {
      ...weather,
      favorite: ( existingWeather && existingWeather.id === weather.id ) || isFavorite,
      hourlyData,
      dailyData,
    };

    state.weatherList[index] = newWeatherData;
    if ( isFavorite ) {
      const favoriteIndex = state.favorites.findIndex( fav => fav.id === weather.id );
      if ( favoriteIndex !== -1 ) {
        state.favorites[favoriteIndex] = {
          ...newWeatherData,
          favorite: true,
        };
      }
    }

    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
    localStorage.setItem( 'favoriteCities', JSON.stringify( state.favorites ) );
  },


  ADD_NEW_WEATHER_CARD( state, city ) {
    state.weatherList.push( { ...city, addToList: true, favorite: false } );
    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
  },

  REMOVE_WEATHER_CARD( state, city ) {
    state.weatherList = state.weatherList.filter( w => w.id !== city.id );
    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
  },

  ADD_TO_FAVORITES( state, city ) {
    const index = state.weatherList.findIndex( w => w.id === city.id );
    if ( index !== -1 ) {
      const favoriteCity = { ...city, favorite: true };
      state.weatherList.splice( index, 1, favoriteCity );
      state.favorites.push( favoriteCity );
    }

    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
    localStorage.setItem( 'favoriteCities', JSON.stringify( state.favorites ) );
  },

  REMOVE_FROM_FAVORITES( state, city ) {
    const weatherItem = state.weatherList.find( w => w.id === city.id );
    if ( weatherItem ) {
      const updatedCity = { ...weatherItem, favorite: false };
      const weatherIndex = state.weatherList.indexOf( weatherItem );
      if ( weatherIndex !== -1 ) {
        state.weatherList.splice( weatherIndex, 1, updatedCity );
      }
      state.favorites = state.favorites.filter( fav => fav.id !== city.id );
    }
    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
    localStorage.setItem( 'favoriteCities', JSON.stringify( state.favorites ) );
  }

};

export default mutations;
