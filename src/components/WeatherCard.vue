<template>
  <div class="card-container">
    <div class="card_header">
      <location-input v-if="!favorite" @location-selected="changeLocation" />
      <h1 v-else>{{ $t('cardTitle') }}</h1>
      <div class="card-btn_box">
        <button
          v-if="weather.favorite"
          class="card-btn"
          @click="removeFromFavorites(weather)"
        >
          <img src="@/assets/icons/hurt.svg" class="icon active" alt="hurt">
        </button>
        <button
          v-if="!weather.favorite && weather.base"
          class="card-btn"
          @click="addToFavorites(weather)"
        >
          <img src="@/assets/icons/hurt.svg" class="icon" alt="hurt">
        </button>
        <button
          v-if="index > 0 && !favorite"
          class="card-btn"
          @click="removeWeatherCard(weather)"
        >
          <img src="@/assets/icons/trash.svg" class="remove-icon" alt="trash">
        </button>
      </div>
    </div>
    <div v-if="weather.base" class="card-body">
      <tab-menu
        :current-tab="currentTab"
        :items="tabMenu"
        @change-tab="changeTab"
      />
      <day-card
        v-if="currentTab === 'day'"
        :weather="weather"
      />
      <week-card
        v-else-if="currentTab === 'week'"
        :weather="weather.dailyData"
      />
      <chart
        v-if="currentTab === 'day'"
        :key="chartKey"
        :hourly-data="weather.hourlyData"
        :location-id="weather.id + index"
      />
      <chart
        v-else-if="currentTab === 'week'"
        :key="chartKey + 1"
        :hourly-data="weather.dailyData"
        :location-id="weather.id + index"
        week
      />
    </div>
    <div v-else class="empty-card">
      <img src="@/assets/images/empty-card.png" alt="empty-card">
    </div>
  </div>
</template>

<script>
// core
import { mapActions } from 'vuex';
// components
import LocationInput from '@/components/LocationInput.vue';
import DayCard from '@/components/DayCard.vue';
import Chart from '@/components/Chart.vue';
import WeekCard from '@/components/WeekCard.vue';
import TabMenu from '@/components/Tab.vue';

export default {
  name: 'WeatherCard',
  components: {
    TabMenu,
    WeekCard,
    LocationInput,
    DayCard,
    Chart,
  },
  props: {
    weather: {
      type: Object,
      default: () => ( {} ),
    },
    index: {
      type: Number,
      default: null,
    },
    cardLength: {
      type: Number,
      default: null,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      currentTab: 'day',
      tabMenu: [],
      chartKey: Date.now(),
    };
  },
  watch: {
    '$i18n.locale'() {
      this.updateTabMenuLabels();
      this.updateChartKey();
    },
    '$route'( ) { 
      this.updateChartKey();
    }
  },
  mounted() {
    this.updateTabMenuLabels();
    window.addEventListener( 'resize', this.updateChartKey );
  },
  beforeUnmount() {
    window.removeEventListener( 'resize', this.updateChartKey );
  },
  methods: {
    ...mapActions( 'weather', [
      'fetchWeather',
      'addToFavorites',
      'removeFromFavorites',
    ] ),
    changeLocation( location ) {
      return this.fetchWeather( { location , weatherId: this.weather.id, index: this.index } );
    },
    removeWeatherCard () {
      return this.$emit( 'remove-card', this.weather );
    },
    changeTab( value ) {
      return this.currentTab = value;
    },
    updateTabMenuLabels() {
      this.tabMenu = [
        { label: this.$t( 'tab1' ), value: 'day' },
        { label: this.$t( 'tab2' ), value: 'week' }
      ];
    },
    updateChartKey() {
      this.chartKey = Date.now();
    }
  },

};
</script>
<style scoped>
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25em 2.5em;
  background: rgba(255, 255, 255, .1);
  border-radius: 0.313rem;
  box-shadow: var(--large-shadow);
}
.card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.card_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-btn_box {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.card-btn {
  border: none;
  background: transparent;
  cursor: pointer;
}
.icon {
  width: 2.7em;
  height: 2.7em;
}
.active {
  filter: brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(7204%) hue-rotate(357deg) brightness(99%) contrast(81%);
}
.remove-icon {
  width: 3em;
  height: 3em;
  filter: var(--icon-fill-color);
}
.empty-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty-card img {
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
  .card-container {
    padding: 1.25em 1.5em;
  }
  .icon {
    width: 2em;
    height: 2em;
  }
  .remove-icon {
    width: 2.3em;
    height: 2.3em;
  }
}
</style>