<template>
  <div class="location-input">
    <img
      class="location-input__img"
      src="@/assets/icons/location.svg"
      alt="location"
    >
    <img
      v-if="query.length"
      class="location-input__img-close"
      src="@/assets/icons/close.svg"
      alt="close"
      @click="clearValue"
    >
    <input
      v-model="query"
      type="text"
      :placeholder="$t('inputPlaceholder')"
      @input="onInput"
    />
    <ul v-if="suggestions.length" class="location_dropdown">
      <li
        v-for="(location, index) in suggestions"
        :key="index"
        class="location_dropdown__item"
        @click="selectCity(location)"
      >
        {{ location.name }}, {{ location.sys.country }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { ApiUrl } from '@/variables';

export default {
  data() {
    return {
      query: '',
      suggestions: []
    };
  },
  methods: {
    async onInput() {
      if ( this.query.length > 2 ) {
        const lang = localStorage.getItem( 'language' );
        const response = await axios.get( `${ ApiUrl }/data/2.5/find?q=${ this.query.toString() }&type=like&lang=${ lang }&appid=${ process.env.VUE_APP_WEATHER_API_KEY }` );
        this.suggestions = response.data.list;
      } else {
        this.suggestions = [];
      }
    },
    selectCity( location ) {
      this.$emit( 'location-selected', location );
      this.query = `${ location.name }, ${ location.sys.country }`;
      this.suggestions = [];
    },
    clearValue() {
      this.query = '';
      this.suggestions = [];
    }
  }
};
</script>

<style scoped>
  .location-input {
    position: relative;
  }
  input {
    width: 100%;
    min-width: 25em;
    padding: 0.625rem 0.625rem 0.625rem 1.875rem;
    font-size: 1rem;
    border-radius: 0.375rem;
    border: 0.125rem solid var(--neutral-50-color);
  }
  input::placeholder {
    color: var(--neutral-50-color);
  }
  .location_dropdown {
    border: 0.063rem solid var(--neutral-50-color);
    position: absolute;
    left: 0;
    top: 2.625rem;
    z-index: 10;
    min-width: 35em;
    background: var(--neutral-10-color);
    padding: 0.625rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .location_dropdown__item {
    list-style: none;
    font-size: 1rem;
    padding: 0.313rem;
    color: var(--text-hover-color);
  }
  .location_dropdown__item:hover {
    cursor: pointer;
    background: var(--primary-focus-color);
    color: var(--text-color);
    font-weight: 700;
    border-radius: 0.313rem;
  }
  .location-input__img {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  .location-input__img-close {
    position: absolute;
    width: 1em;
    height: 1em;
    right: 0.8rem;
    top: 0.8rem;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    input {
      min-width: 12em;
    }
    .location-input__img {
      width: 1.2em;
      height: 1.2em;
      top: 0.7rem;
    }
    .location_dropdown {
      min-width: 13.1em;
    }
  }
</style>
