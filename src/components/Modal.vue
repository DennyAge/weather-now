<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <button
          class="close-btn"
          @click="onClose"
        >
          <img src="@/assets/icons/close.svg" alt="close">
        </button>
      </div>
      <div class="modal-body">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button
          class="modal-footer__btn"
          @click="onClose"
        >
          {{ $t('cancel') }}
        </button>
        <button
          class="modal-footer__btn"
          @click="onSave"
        >
          {{ $t('confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },

  }, 
  methods: {
    onSave() {
      this.$emit( 'save' );
    },
    onClose() {
      this.$emit( 'close' );
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: var(--bg-color);
  border-radius: 8px;
  text-align: center;
  width: max-content;
  min-width: 15em;
  box-shadow: var(--large-shadow);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  border-bottom: 1px solid var(--neutral-60-color);
  padding: 0.5em 1em;
}
.close-btn {
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
}
.close-btn img {
  width: 1.5em;
  height: 1.5em;
  filter: var(--icon-fill-color);
}
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5em;
  padding: 1rem 2.5rem;
}
.modal-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 2rem;
  border-top: 0.063rem solid var(--neutral-60-color);
}
.modal-footer__btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-color);
  border: 0.063rem solid var(--neutral-60-color);
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--text-color);
}
.modal-footer__btn:hover {
  background: var(--primary-focus-color);
  color: var(--neutral-10-color);
  font-weight: 700;
}
</style>
