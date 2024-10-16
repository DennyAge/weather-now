<template>
  <div class="container">
    <page-header />
    <router-view />
    <button
      v-if="showScrollButton"
      class="scroll-to-top"
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
  },
  data() {
    return {
      lang: '',
      showScrollButton: false // новое свойство для отображения кнопки
    };
  },
  watch: {
    '$i18n.locale'( newLang ) {
      this.lang = newLang;
      localStorage.setItem( 'language', newLang );
      this.$store.dispatch( 'weather/updateWeather' );
    }
  },
  mounted() {
    this.lang = this.$i18n.locale;
    localStorage.setItem( 'language', this.lang );
    this.$store.dispatch( 'weather/startWeatherUpdates' );

    window.addEventListener( 'scroll', this.handleScroll ); // добавляем обработчик прокрутки
  },
  beforeUnmount() {
    window.removeEventListener( 'scroll', this.handleScroll ); // удаляем обработчик
  },
  methods: {
    handleScroll() {
      this.showScrollButton = window.scrollY > 300; // показываем кнопку при прокрутке
    },
    scrollToTop() {
      window.scrollTo( {
        top: 0,
        behavior: 'smooth' // плавная прокрутка
      } );
    }
  }
};
</script>



<style>
:root {
  /* primary */
  --primary-focus-color          : #A0A2ED;
  /* neutral */
  --neutral-10-color             : #FFFFFF;
  --neutral-20-color             : #F9F9FB;
  --neutral-30-color             : #F2F2F2;
  --neutral-40-color             : #E0E0E0;
  --neutral-50-color             : #C2C2C2;
  --neutral-60-color             : #9E9E9E;
  --neutral-70-color             : #757575;
  --neutral-80-color             : #616161;
  --neutral-90-color             : #434343;
  --neutral-100-color            : #282828;


  /* shadows */
  --large-shadow  : 0 0.0625rem 1.5rem 0.5rem rgba(0, 0, 0, 0.08), 0 0 0.0625rem rgba(20, 20, 20, 0.08);

  .light-theme {
    background: url("@/assets/images/bg-light.jpg") center center no-repeat fixed;
    --bg-color: var(--neutral-10-color);
    --text-color: var(--neutral-100-color);
    --text-hover-color: var(--neutral-100-color);
    --icon-fill-color: brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(17%) hue-rotate(66deg) brightness(95%) contrast(102%);

  }
  .dark-theme {
    background: url("@/assets/images/bg-dark.jpg") center center no-repeat fixed;
    --bg-color: var(--neutral-100-color);
    --text-color: var(--neutral-10-color);
    --text-hover-color: var(--neutral-100-color);
    --icon-fill-color: brightness(0) saturate(100%) invert(98%) sepia(6%) saturate(253%) hue-rotate(324deg) brightness(115%) contrast(100%);
  }

}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  width: 100%;
  height: 100vh;
  color: var(--text-color);
  background: url("@/assets/images/bg-light.jpg") center no-repeat;
}
.container {
  width: 100%;
  max-width: 75em;
  margin: 0 auto;
  padding: 0 1.25rem;
  overflow: hidden;
}
.scroll-to-top {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  border: none;
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
  font-size: 1.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  z-index: 10;
}

.scroll-to-top:hover {
  background-color: var(--primary-focus-color);
}

.scroll-to-top:focus {
  outline: none;
}
</style>
