// core
import { createStore } from 'vuex';
// modules
import weather from './modules/weather';

const store = createStore( {
  modules: {
    weather
  }
} );

export default store;
 