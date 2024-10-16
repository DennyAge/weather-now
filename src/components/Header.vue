<template>
  <header class="header" :class="['header', { 'sticky': isSticky }]">
    <div class="logo-container">
      <img class="logo" src="@/assets/logo.svg" alt="logo">
      <span>WeatherNow</span>
    </div>
    <div class="nav-bar">
      <button class="burger-btn" @click="toggleMenu">
        <img class="burger-icon" src="@/assets/icons/burger.svg" alt="burger">
      </button>

      <nav v-if="!isMenuOpen" class="menu">
        <router-link
          class="menu_link"
          exact-active-class="active"
          to="/"
        >
          {{ $t('home') }}
        </router-link>
        <router-link
          class="menu_link"
          exact-active-class="active"
          to="/favorites"
        >
          {{ $t('favorites') }}
        </router-link>
      </nav>
      <nav v-else class="nav-bar__burger ">
        <button class="close-btn" @click="toggleMenu">
          <img
            class="close-icon"
            src="@/assets/icons/close.svg"
            alt="close"
          >
        </button>
        <router-link
          class="nav-bar__burger__link"
          exact-active-class="active"
          to="/"
          @click="toggleMenu"
        >
          {{ $t('home') }}
        </router-link>
        <router-link
          class="nav-bar__burger__link"
          exact-active-class="active"
          to="/favorites"
          @click="toggleMenu"
        >
          {{ $t('favorites') }}
        </router-link>
      </nav>
      <div class="switch-box">
        <language-dropdown />
        <theme-switch />
      </div>
    </div>

  </header>

</template>

<script>
//components
import LanguageDropdown from '@/components/LanguageDropdown.vue';
import ThemeSwitch from '@/components/ThemeSwitch.vue';

export default {
  name: 'PageHeader',
  components: {
    ThemeSwitch,
    LanguageDropdown
  },
  data() {
    return {
      isMenuOpen: false,
      isSticky: false,
    };
  },
  mounted() {
    window.addEventListener( 'scroll', this.handleScroll );
  },

  beforeUnmount() {
    window.removeEventListener( 'scroll', this.handleScroll );
  },

  methods: {
    toggleMenu() {
      return this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      this.isSticky = window.scrollY > 100; // Проверяем, прокрутился ли экран больше чем на 100px
    },
  }
};
</script>


<style scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.625rem;
  margin-bottom: 1rem;
  border-bottom: 0.125rem solid var(--text-color);
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.25rem;
}
.logo {
  width: 2.5rem;
}
.logo-container span {
  font-weight: 700;
  font-size: 1.5rem;
}
.nav-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
}
.menu {
  display: flex;
  align-content: center;
  gap: 1rem;

}
.nav-bar__burger {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 11em;
  background-color: var(--bg-color);

  padding: 1rem;
  z-index: 100;
}
.close-icon {
  width: 1.5em;
  height: 1.5em;
  margin-bottom: 2em;
}
.nav-bar__burger__link {
  color: var(--text-color);
  font-size: 1.5rem;
  text-decoration: none;
  margin-bottom: 0.5em;
  width: max-content;
  cursor: pointer;
  border-bottom: 0.125rem solid transparent;
}
.nav-bar__burger__link:hover {
  border-bottom: 0.125rem solid var(--primary-focus-color);
}
.nav-bar__burger__link.active {
  border-bottom: 0.125rem solid var(--primary-focus-color);
}
.menu_link {
  width: 100%;
  min-width: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.313rem 0.625rem;
  border-radius: 0.313rem;
  color: var(--text-color);
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(0.3rem);
  box-shadow: var(--large-shadow);
  border: 0.063rem solid var(--text-color);
}
.menu_link:hover {
  background-color: var(--neutral-10-color);
  color: var(--text-hover-color);
  font-weight: 500;
}
.menu_link.active {
  background-color: var(--neutral-10-color);
  color: var(--text-hover-color);
  font-weight: 700;
}
.switch-box {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.burger-btn, .close-btn {
  width: max-content;
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.burger-btn {
  display: none;
}

.burger-icon {
  width: 1.25rem;
  height: 1.25rem;
  filter: var(--icon-fill-color);
}

@media (max-width: 768px) {
  .burger-btn {
    display: block;
  }
  .menu {
    display: none;
  }
}
</style>
