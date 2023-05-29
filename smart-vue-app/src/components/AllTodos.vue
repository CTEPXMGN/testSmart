<template>
  <div class="all-todos">
    <table class="table">
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Выполнено</th>
        <th>Удалить</th>
        <th>Изменить</th>
      </tr>
      <tr v-for="todo in todosData" :key="todo.id">
        <td class="item-id">{{ todo.id }}</td>
        <td class="item-title" :class="{ done: todo.completed }">
          {{ todo.title }}
        </td>
        <td class="item-check">
          <input
            class="item-check__input"
            type="checkbox"
            v-if="todo.userId === currentUserId"
            v-bind:checked="todo.completed"
            @click="$emit('toggleDoneTask', todo.id)"
          />
          <div class="chekbox"></div>
        </td>
        <td class="item-del">
          <button
            v-if="todo.userId === currentUserId"
            class="item-btn item-btn__del"
            @click="
              toggleMessage();
              $emit('removeTask', todo.id);
            "
          ></button>
        </td>
        <td class="item-change">
          <button
            v-if="todo.userId === currentUserId"
            class="item-btn item-btn__change"
            @click="
              toggleEditTaskModal();
              setEditableId(todo.id);
            "
          ></button>
        </td>
      </tr>
    </table>

    <button class="add-item__btn" @click="toggleNewTaskModal"></button>
    <AddTaskModal
      @toggleNewTaskModal="toggleNewTaskModal"
      @addNewTask="this.$emit('addNewTask')"
      :addModalView="addModalView"
      :todosData="todosData"
    />
    <AddEditModal
      @toggleEditTaskModal="toggleEditTaskModal"
      @addNewTask="this.$emit('editTask')"
      :editModalView="editModalView"
      :todosData="todosData"
      :editableId="editableId"
    />
    <ShowMessage :class="{ hide: hideMessage }" :deletedId="deletedId" />
  </div>
</template>

<script>
import AddTaskModal from "./AddTaskModal.vue";
import AddEditModal from "./AddEditModal.vue";
import ShowMessage from "./ShowMessage.vue";
export default {
  emits: ["removeTask"],
  data() {
    return {
      addModalView: true,
      editModalView: true,
      hideMessage: true,
      deletedId: null,
      editableId: null,
    };
  },
  props: {
    todosData: {
      type: Array,
      required: true,
    },
    currentUserId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleNewTaskModal() {
      this.addModalView = !this.addModalView;
    },
    toggleEditTaskModal() {
      this.editModalView = !this.editModalView;
    },
    toggleMessage() {
      this.hideMessage = !this.hideMessage;
      setTimeout(() => {
        this.hideMessage = !this.hideMessage;
      }, 2000);
    },
    setDeletedId(id) {
      this.deletedId = id;
    },
    setEditableId(id) {
      this.editableId = id;
    },
  },
};
</script>

<style scoped>
.all-todos {
  flex-grow: 1;
  padding-bottom: 100px;
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
  padding-left: 15px;
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
  background-image: url(../assets/img/delete.png);
  background-position: center;
  background-repeat: no-repeat;
}

.item-btn__change {
  background-size: 70%;
  background-image: url(../assets/img/edit.png);
  background-position: center;
  background-repeat: no-repeat;
}

td,
th {
  height: 50px;
  text-align: center;
  border-bottom: 1px solid grey;
}

tr:nth-child(even) {
  background-color: #2e2e2e;
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
  background-image: url(../assets/img/add.png);
  background-position: center;
  background-repeat: no-repeat;
}

.done {
  text-decoration: line-through;
  color: rgb(88, 88, 88);
}
</style>
