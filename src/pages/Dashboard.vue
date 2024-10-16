<template>
  <div class="dashboard">
    <loader v-if="isLoading" :loading="isLoading" />
    <CustomModal
      :is-open="isOpen"
      :title="cityName || $t('emptyCard')"
      :message="$t('removeMessage')"
      @save="onSave"
      @close="onClose"
    />
    <WeatherCard
      v-for="(weather, index) in weatherList"
      :key="index"
      :weather="weather"
      :index="index"
      :card-length="weatherList.length"
      @remove-card="removeCard"
    />
    <div class="add-new-card__container">
      <button
        class="add-new-card__btn"
        @click="addNewWeatherCard"
      >
        <img src="@/assets/icons/add-circle.svg" class="add-icon" alt="add-icon">
      </button>
    </div>
  </div></template>

<script>
// core
import { mapActions, mapGetters } from 'vuex';
// components
import Loader from '@/components/Loader.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import CustomModal from '@/components/Modal.vue';

export default {
  name: 'DashboardPage',
  components: {
    CustomModal,
    WeatherCard,
    Loader,
  },
  data() {
    return {
      isOpen: false,
      weatherCard: null
    };
  },
  computed: {
    ...mapGetters( 'weather', [
      'weatherList',
      'isLoading'
    ] ),
    cityName() {
      if ( this.weatherCard?.name ) {
        return `${ this.weatherCard?.name }, ${ this.weatherCard?.sys?.country }`;
      } else {
        return false;
      }
    },
  },
  mounted() {
    if ( this.weatherList.length === 0 ) {
      this.$store.dispatch( 'weather/fetchWeatherByGeolocation' );
    }
  },
  methods: {
    ...mapActions( 'weather', [
      'fetchWeather',
      'addNewWeatherCard',
      'removeWeatherCard'
    ] ),
    removeCard( value ) {
      this.isOpen = true;
      this.weatherCard = value;
      return null;
    },
    onClose () {
      return this.isOpen = false;
    },
    onSave() {
      this.removeWeatherCard( this.weatherCard );
      this.isOpen = false;
    }
  },

};
</script>

<style>
  .dashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-bottom: 6rem;
  }
  .add-icon {
    width: 2em;
    height: 2em;
    filter: var(--icon-fill-color);
  }
  .add-new-card__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-new-card__btn {
    width: 100%;
    padding: 1rem;
    border: 0.063rem solid var(--text-color);
    background: rgba(255, 255, 255, .1);
    border-radius: 0.313rem;
    box-shadow: var(--large-shadow);
    cursor: pointer;
  }
  .add-new-card__btn:hover {
    background: rgba(255, 255, 255, .3);
  }
</style>
