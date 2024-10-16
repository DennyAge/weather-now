<template>
  <div class="weather-card__container">
    <div
      v-for="(item, index) in weather"
      :key="index"
    >
      <div class="weather-card__week">
        <h4>{{ formatDate(item.date) }}</h4>
        <img :src="`${ imageUrl() }${ item.icon }@2x.png`" alt="Weather Icon" class="weather-icon" />
        <h2 class="temperature"> {{ parseInt(item.tempMin) }} / {{ parseInt(item.tempMax) }}°C</h2>
        <span>{{ item.weather }}</span>
        <p>{{ $t('') }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import { imageUrl } from '@/variables';
import { formatDate } from '../helpers';

export default {
  name: 'WeekCard',
  props: {
    weather: {
      type: Object,
      default: () => ( {} ),
    },
  },

  computed: {
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

  },
  methods: {
    formatDate,
    imageUrl() {
      return imageUrl;
    },
  },
};
</script>

<style scoped>
.weather-card__container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  gap: 1em;
}
.weather-card__week {
  width: 100%;
  max-width: 21.875rem;
  padding: 1.25rem;
  text-align: center;
  background: url("@/assets/images/banner-img.png") center center no-repeat;
  border-radius: 2rem;
}
.weather-icon {
  width: 5em;
}
.temperature {
  margin-bottom: 1rem;
}
.weather-details__item img {
  width: 2em;
  height: 2em;
  filter: var(--icon-fill-color);
}
</style>
