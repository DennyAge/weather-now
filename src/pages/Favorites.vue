<template>
  <div class="favorite-page">
    <loader v-if="isLoading" :loading="isLoading" />
    <WeatherCard
      v-for="(weather, index) in filteredWeatherList"
      :key="index"
      :weather="weather"
      :index="index"
      :card-length="filteredWeatherList.length"
      favorite
    />
    <div v-if="filteredWeatherList.length <= 0" class="empty-card">
      <img src="@/assets/images/empty-card.png" alt="empty-card">
    </div>
  </div>
</template>

<script>
// core
import { mapActions, mapGetters } from 'vuex';
// components
import Loader from '@/components/Loader.vue';
import WeatherCard from '@/components/WeatherCard.vue';


export default {
  name: 'FavoritePage',
  components: {
    WeatherCard,
    Loader,
  },
  computed: {
    ...mapGetters( 'weather', [ 'weatherList', 'isLoading' ] ),
    filteredWeatherList() {
      return this.weatherList.filter( city => city.favorite );
    }
  },
  methods: {
    ...mapActions( 'weather', [
      'fetchWeather',
      'addNewWeatherCard',
      'addToFavorites',
      'removeFromFavorites',
      'addNewWeatherCard',
      'removeWeatherCard'
    ] ),
  },

};
</script>
<style scoped>
.favorite-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 0 auto;
  padding-bottom: 6rem;
}
.empty-card {
  margin-top: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty-card img {
  width: 100%;
  height: 100%;
}
</style>
