<template>
  <main>
    <table class="table">
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Выполнено</th>
        <th>Удалить</th>
        <th>Изменить</th>
      </tr>
      <tr v-for="todo in todosData">
        <td class="item-id">{{ todo.id }}</td>
        <td class="item-title" :class="{ done: todo.completed }">
          {{ todo.title }}
        </td>
        <td class="item-check">
          <input
            class="item-check__input"
            type="checkbox"
            v-bind:checked="todo.completed"
          />
          <div class="chekbox"></div>
        </td>
        <td class="item-del">
          <button
            class="item-btn item-btn__del"
            @click="deleteTask(todo.id)"
          ></button>
        </td>
        <td class="item-change">
          <button class="item-btn item-btn__change"></button>
        </td>
      </tr>
    </table>

    <button class="add-item__btn" @click="toggleNewTaskModal"></button>

    <div class="add-modal" :class="{ hide: addModalView }">
      <form class="add-modal__form" @submit.prevent="">
        <input type="text" class="add-modal__input" />
        <div class="add-modal__btns">
          <button class="add-modal__btn-save" @click="toggleNewTaskModal">
            Сохранить
          </button>
          <button class="add-modal__btn-cancel" @click="toggleNewTaskModal">
            Отмена
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  emits: ["addTaskModal"],
  props: {
    todosData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      addModalView: true,
    };
  },
  methods: {
    async deleteTask(id) {
      console.log(id);
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
    },
    handleAddModal() {
      this.$emit("addTaskModal");
    },
    toggleNewTaskModal() {
      this.addModalView = !this.addModalView;
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  position: relative;
}
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 20px 0;
}

.item-id {
  width: 50px;
}

.item-check {
  width: 50px;
}

.item-title {
  text-align: left;
}

.item-del,
.item-change {
  width: 20px;
}

.item-btn {
  height: 40px;
}

.item-btn__del {
  background-size: 75%;
  background-image: url(../../assets/img/delete.png);
  background-position: center;
  background-repeat: no-repeat;
}

.item-btn__change {
  background-size: 70%;
  background-image: url(../../assets/img/edit.png);
  background-position: center;
  background-repeat: no-repeat;
}

td,
th {
  height: 50px;
  text-align: center;
  border-bottom: 1px solid grey;
}

th {
  border-bottom: 3px solid teal;
}

.add-item__btn {
  height: 50px;
  width: calc(100% - 40px);
  margin: 20px auto;
  border: 1px solid #42b983;
  background-color: inherit;
  background-size: 25px;
  background-image: url(../../assets/img/add.png);
  background-position: center;
  background-repeat: no-repeat;
}

.done {
  text-decoration: line-through;
  color: rgb(88, 88, 88);
}

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
