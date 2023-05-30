<template>
  <div class="all-todos">
    <table class="table">
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Пользователь</th>
        <th>Выполнено</th>
        <th>Удалить</th>
        <th>Изменить</th>
      </tr>
      <tr v-for="todo in todosData" :key="todo.id">
        <td class="item-id">{{ todo.id }}</td>
        <td class="item-title" :class="{ done: todo.completed }">
          {{ todo.title }}
        </td>
        <td class="item-user">
          {{ this.getUserName(todo.userId) }}
        </td>
        <td class="item-check">
          <input
            class="item-check__input"
            type="checkbox"
            v-if="todo.userId === currentUserId"
            v-bind:checked="todo.completed"
            @change="$emit('toggleDoneTask', todo.completed, todo.id)"
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
              setDeletedId(todo.id);
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

    <div class="all-todos__footer">
      <button class="add-item__btn" @click="toggleNewTaskModal"></button>
      <select name="" id="">
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
    </div>

    <add-task-modal
      @toggleNewTaskModal="toggleNewTaskModal"
      @addNewTask="this.$emit('addNewTask')"
      :addModalView="addModalView"
      :todosData="todosData"
    />
    <add-edit-modal
      @toggleEditTaskModal="toggleEditTaskModal"
      @addNewTask="this.$emit('editTask')"
      :editModalView="editModalView"
      :todosData="todosData"
      :editableId="editableId"
    />
    <show-message :class="{ hide: hideMessage }" :deletedId="deletedId" />
  </div>
</template>

<script>
import AddTaskModal from "./AddTaskModal.vue";
import AddEditModal from "./AddEditModal.vue";
import ShowMessage from "./ShowMessage.vue";
export default {
  components: {
    AddTaskModal,
    AddEditModal,
    ShowMessage,
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
    usersData: {
      type: Array,
      required: true,
    },
  },
  emits: ["removeTask", "toggleDoneTask", "addNewTask", "editTask"],
  data() {
    return {
      addModalView: true,
      editModalView: true,
      hideMessage: true,
      deletedId: null,
      editableId: null,
    };
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
    getUserName(id) {
      return this.usersData.map((user) => {
        return user.id === id ? user.name : "";
      })[id - 1];
    },
  },
  mounted() {
    this.getUserName();
  },
};
</script>

<style scoped>
.all-todos {
  flex-grow: 1;
  padding-bottom: 100px;
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

.item-user:hover {
  color: white;
  background-color: teal;
  cursor: pointer;
}

.item-check {
  width: 50px;
}

.item-check__input {
  cursor: pointer;
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
  /* margin: 20px auto; */
  margin-right: 20px;
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

.all-todos__footer {
  width: calc(100% - 40px);
  margin: 20px auto;
  display: flex;
  flex-direction: row;
}
</style>
