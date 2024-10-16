<template>
  <div class="tab-container">
    <ul class="tab-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="tab-list__item"
        :class="{ 'active-tab': currentTab === item.value }"
        @click="changeTab(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'TabMenu',
  props: {
    items: {
      type: Array,
      default: () => [] ,
    },
    currentTab: {
      type: String,
      default: '',
    },
  },

  methods: {
    changeTab( value ) {
      return this.$emit( 'change-tab', value );
    }
  },
};
</script>

<style scoped>
.tab-container {
  width: 100%;
}
.tab-list {
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
}
.tab-list__item {
  font-size: 1.3rem;
  padding-bottom: .1rem;
  border-bottom: 0.188rem solid transparent;
  cursor: pointer;
}
.tab-list__item:hover {
  font-weight: 700;
  color: var(--text-color);
  border-bottom: 0.188rem solid var(--text-color);
}
.active-tab {
  font-weight: 700;
  border-bottom: 0.188rem solid var(--text-color);
}
</style>