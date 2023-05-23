<template>
  <div class="message-modal">
    <p class="message-modal__text">Запись {{ id }} удалена</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideMessage: false,
    };
  },
  methods: {
    handlerToggle() {
      this.title = "";
    },
  },
};
</script>

<style scoped>
.message-modal {
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: #42b983;
}

.message-modal__text {
  line-height: 1;
}

.hide {
  display: none;
}
</style>
