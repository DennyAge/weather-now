<template>
  <div class="theme-switch">
    <button
      class="theme-switch__btn"
      :class="{ active: isLightTheme }"
      @click="setTheme('light')"
    >
      <img src="@/assets/icons/sun.svg" alt="sun" />
    </button>
    <button
      class="theme-switch__btn"
      :class="{ active: !isLightTheme }"
      @click="setTheme('dark')"
    >
      <img src="@/assets/icons/moon.svg" alt="moon" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitch',
  data() {
    return {
      isLightTheme: true,
    };
  },
  mounted() {
    const savedTheme = localStorage.getItem( 'theme' );
    if ( savedTheme ) {
      this.setTheme( savedTheme );
    } else {
      this.setTheme( 'light' );
    }
  },
  methods: {
    setTheme( theme ) {
      document.body.className = theme + '-theme';
      localStorage.setItem( 'theme', theme );
      this.isLightTheme = theme === 'light';
    },
  },
};
</script>

<style scoped>
.theme-switch {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.3rem);
  box-shadow: var(--large-shadow);
  border-radius: 1rem;
  padding: 0.1rem 0.2rem;
}

.theme-switch__btn {
  border: none;
  background: transparent;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.theme-switch__btn img {
  opacity: 0.2;
}

.theme-switch__btn.active img {
  opacity: 1;
}
</style>
