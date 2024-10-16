<template>
  <div class="language-dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown">
      {{ currentLanguage === 'ua' ? 'UA' : 'ENG' }}
      <img
        v-if="!isDropdownOpen"
        class="language-dropdown__icon"
        src="@/assets/icons/chevron-down.svg"
        alt=""
      >
      <img
        v-else
        class="language-dropdown__icon"
        src="@/assets/icons/chevron-up.svg"
        alt=""
      >
      
    </button>
    <div v-if="isDropdownOpen" class="dropdown-menu">
      <div
        class="dropdown-item"
        @click="switchLanguage('ua')"
      >
        UA
      </div>
      <div
        class="dropdown-item"
        @click="switchLanguage('en')"
      >
        ENG
      </div>
    </div>
  </div>
</template>

<script>

//components


export default {
  name: 'LanguageDropdown',
  components: {
  },
  data() {
    return {
      currentLanguage: 'ua',
      isDropdownOpen: false,
    };
  },
  mounted() {
    const savedLanguage = localStorage.getItem( 'language' );
    if ( savedLanguage ) {
      this.switchLanguage( savedLanguage );
    }
  },
  methods: {
    switchLanguage( lang ) {
      this.$i18n.locale = lang;
      localStorage.setItem( 'language', lang );
      this.currentLanguage = lang;
      this.isDropdownOpen = false;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>

<style scoped>
.language-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  width: 100%;
  min-width: 70px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.3rem);
  border: none;
  color: var(--text-color);
  font-weight: 700;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
}

.language-dropdown__icon {
  width: 1.25rem;
  height: 1.25rem;
  filter: var(--icon-fill-color);
  position: absolute;
  right: 0.3rem;
  top: 0.35rem;

}
.dropdown-menu {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.3rem);
  border-radius: 0.3rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  z-index: 10;
}

.dropdown-item {
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-color);
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: var(--neutral-10-color);
  color: var(--text-hover-color);
  font-weight: 500;
  border-radius: 0.3rem;
}
</style>
