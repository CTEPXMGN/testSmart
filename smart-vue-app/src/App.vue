<template>
  <AuthPage
    v-if="!isLogged"
    @setLogin="setLogin"
    @setCurrentUser="setCurrentUser"
    @getTodos="getTodos"
  />
  <div v-else>
    <header-comp
      :isLogged="isLogged"
      :currentUserId="currentUserId"
      @setLogin="setLogin"
    />
    <main-comp
      :currentUserData="currentUserData"
      @removeTask="removeTask"
      @toggleDoneTask="toggleDoneTask"
      @addNewTask="addNewTask"
      @editTask="editTask"
    />
    <footer class="footer">
      <p>
        Данное приложение представляет собой список задач. Данные можно
        добавлять, удалять, изменять.
      </p>
    </footer>
  </div>
</template>

<script>
import HeaderComp from "./components/HeaderComp.vue";
import MainComp from "./components/MainComp.vue";
import AuthPage from "./components/AuthPage.vue";
import getId from "./utils.js";

export default {
  components: {
    HeaderComp,
    MainComp,
    AuthPage,
  },
  data() {
    return {
      currentUserId: 1,
      editableTask: null,
      isLogged: false,
      todosData: [],
      currentUserData: [],
    };
  },
  methods: {
    async getTodos() {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/todos`
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          console.log(result);
          this.todosData = result;
          this.filterData();
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    filterData() {
      this.currentUserData = this.todosData.filter((task) => {
        return task.userId === this.currentUserId;
      });
    },
    setLogin() {
      this.isLogged = !this.isLogged;
    },
    setCurrentUser(id) {
      this.currentUserId = id;
    },
    removeTask(id) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      this.todosData = this.todosData.filter((todo) => {
        return todo.id !== id;
      });
    },
    editTask(task) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: task,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    addNewTask(task) {
      fetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: task,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => (this.todosData = [...this.todosData, json]));
    },
    toggleDoneTask(id) {
      this.todosData = this.todosData.map((task) => {
        task.id === id && (task.completed = !task.completed);
        return task;
      });
    },
  },
  // mounted() {
  //   this.getTodos();
  // },
};
</script>

<style scoped>
.main {
  flex-grow: 1;
}

.footer {
  height: 80px;
  padding: 10px 20px;
  position: sticky;
  bottom: 0;
  background-color: #242424;
  border-top: 2px solid #fff;
}
</style>
