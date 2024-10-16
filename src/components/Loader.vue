<template>
  <div v-if="loading" class="loader">
    <img src="@/assets/loader.gif" alt="loader" class="loader_img" />
  </div>
</template> 

<script>
export default {
  name: 'CustomLoader',
  props: {
    loading: Boolean,
  },
};
</script>

<style>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.loader_img {
  width: 18rem;
  height: 18rem;
}
</style>
