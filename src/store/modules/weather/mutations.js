const mutations = {
  SET_LOADING( state, status ) {
    state.loading = status;
  },
  SET_WEATHER( state, { weather, hourlyData, dailyData, index } ) {
    if ( state.weatherList[index] ) {
      state.weatherList[index] = { ...weather, favorite: false, hourlyData, dailyData };
    } else {
      state.weatherList[index] = { ...weather, favorite: false, hourlyData, dailyData };
    }
    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
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
      state.weatherList.splice( index, 1, { ...city, favorite: true } );
    } else {
      state.weatherList.push( { ...city, favorite: true } );
    }
    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
  },
  REMOVE_FROM_FAVORITES( state, city ) {
    const index = state.weatherList.findIndex( w => w.id === city.id );
    state.weatherList.splice( index, 1, { ...city, favorite: false } );
    localStorage.setItem( 'weatherList', JSON.stringify( state.weatherList ) );
  }


};

export default mutations;