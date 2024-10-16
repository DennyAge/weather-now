<template>
  <div class="weather-card__day">
    <div class="left-side">
      <h1 class="cityName">{{ cityName }}</h1>
      <h4>{{ formatDate(weather.dt, 'long') }}</h4>
      <div class="weather-details">
        <div class="weather-details__item">
          <img src="@/assets/icons/water.svg" alt="humidity">
          <div class="text">
            <div class="weather-info">
              <span> {{ humidity }}%</span>
            </div>
            <p>{{ $t('humidity') }}</p>
          </div>
        </div>
        <div class="weather-details__item">
          <img src="@/assets/icons/wind.svg" alt="wind">
          <div class="text">
            <div class="weather-info">
              <span>{{ wind }} m/s</span>
            </div>
            <p>{{ $t('wind') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side">
      <img :src="getWeatherIcon" alt="Weather Icon" class="weather-icon" />
      <h1 class="temperature"> {{ temperature }}°C</h1>
      <h3 class=""> {{ temperatureMin }} - {{ temperatureMax }}°C</h3>
    </div>

  </div>
</template>

<script>

import { imageUrl } from '@/variables';
import { formatDate } from '@/helpers';

export default {
  name: 'DayCard',
  props: {
    weather: {
      type: Object,
      default: () => ( {} ),
    },
  },

  computed: {
    cityName() {
      if ( this.weather?.name ) {
        return `${ this.weather?.name }, ${ this.weather?.sys?.country }`;
      } else {
        return '';
      }
    },
    temperature() {
      if ( this.weather?.main ) {
        return parseInt( this.weather?.main.temp );
      } else {
        return '0';
      }
    },
    temperatureMax() {
      if ( this.weather?.main ) {
        return parseInt( this.weather?.main.temp_max );
      } else {
        return '0';
      }
    },
    temperatureMin() {
      if ( this.weather?.main ) {
        return parseInt( this.weather?.main.temp_min );
      } else {
        return '0';
      }
    },
    wind() {
      if ( this.weather?.wind ) {
        return this.weather?.wind.speed;
      } else {
        return '0';
      }
    },
    humidity() {
      if ( this.weather?.main ) {
        return this.weather?.main.humidity;
      } else {
        return '0';
      }
    },
    weatherIconName() {
      if ( this.weather.weather ) {
        return this.weather?.weather[0]?.icon;
      }
      else {
        return '01d';
      }
    },
    getWeatherIcon() {
      return `${ imageUrl }${ this.weatherIconName }@2x.png`;
    }
  },
  methods: { formatDate },
};
</script>

<style scoped>
.weather-card__day {
  width: 100%;
  border-radius: 2rem;
  padding: 1.25em 8em;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url("@/assets/images/banner-img.png") center center no-repeat;
}
.left-side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.right-side {
  padding-top: 5rem;
  position: relative;
}
.right-side h3 {
  width: 100%;
}
.weather-icon {
  position: absolute;
  top: -2rem;
  right: -1.8rem;
  width: 8em;
}
.weather-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}
.weather-details__item, .weather-info {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.weather-details__item img {
  width: 2em;
  height: 2em;
  filter: var(--icon-fill-color);
}
@media (max-width: 768px) {
  .weather-card__day {
    flex-direction: column;
    padding: 1.25em 5em;
  }
}
</style>
