<template>
  <div class="add-modal" :class="{ hide: addModalView }">
    <form class="add-modal__form" @submit.prevent="">
      <input type="text" class="add-modal__input" v-model="title" />
      <div class="add-modal__btns">
        <button
          class="add-modal__btn-save"
          @click="
            handlerToggle();
            addNewTask({
              id: 250,
              userId: 1,
              completed: false,
              title: '1234567',
            });
          "
        >
          Сохранить
        </button>
        <button class="add-modal__btn-cancel" @click="handlerToggle">
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["toggleNewTaskModal", "addNewTask"],
  props: {
    addModalView: {
      type: Boolean,
    },
    todosData: {
      type: Array,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    handlerToggle() {
      this.title = "";
      this.$emit("toggleNewTaskModal");
    },
  },
};
</script>

<style scoped>
.add-modal {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* opacity: 0; */
  /* pointer-events: none; */
  transition: 0.5s;
  /* order: 3; */
}

.add-modal__form {
  width: 220px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background-color: lightgray;
  color: black;
}

.add-modal__input {
  height: 20px;
  width: 95%;
  margin-bottom: 20px;
}

.add-modal__btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.hide {
  display: none;
}
</style>
