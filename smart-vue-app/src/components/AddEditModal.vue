<template>
  <div class="add-modal" :class="{ hide: editModalView }">
    <form class="add-modal__form" @submit.prevent="">
      <input type="text" class="add-modal__input" v-model="title" />
      <div class="add-modal__btns">
        <button
          class="add-modal__btn-save"
          @click="
            this.$parent.$emit('editTask', this.title, this.editableId); // $parent - это костыль? Как можно от него избавиться?
            handlerToggle();
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
  emits: ["toggleEditTaskModal", "editTask"],
  props: {
    editModalView: {
      type: Boolean,
    },
    todosData: {
      type: Array,
    },
    editableId: {
      type: Number,
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
      this.$emit("toggleEditTaskModal");
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
  border: 1px solid #42b983;
  background-color: #242424;
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
