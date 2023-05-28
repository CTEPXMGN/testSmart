<template>
  <AuthPage
    v-if="!isLogged"
    @setLogin="setLogin"
    @setCurrentUser="setCurrentUser"
    @getAllTodos="getAllTodos"
    @getUsers="getUsers"
    @getFilteringTodos="getFilteringTodos"
  />
  <div v-else>
    <header-comp
      :isLogged="isLogged"
      :currentUserName="currentUserName"
      @changeActivePage="changeActivePage"
      @setLogin="setLogin"
    />

    <main-comp
      v-if="activePage === 1"
      :currentUserData="currentUserData"
      @removeTask="removeTask"
      @toggleDoneTask="toggleDoneTask"
      @addNewTask="addNewTask"
      @editTask="editTask"
    />

    <all-todos
      v-else-if="activePage === 2"
      :todosData="todosData"
      :currentUserId="currentUserId"
      @removeTask="removeTask"
    />

    <users-comp v-else-if="activePage === 3" :usersData="usersData" />

    <footer-comp />
  </div>
</template>

<script>
import HeaderComp from "./components/HeaderComp.vue";
import FooterComp from "./components/FooterComp.vue";
import MainComp from "./components/MainComp.vue";
import AllTodos from "./components/AllTodos.vue";
import UsersComp from "./components/Users.vue";
import AuthPage from "./components/AuthPage.vue";

export default {
  components: {
    HeaderComp,
    FooterComp,
    MainComp,
    AllTodos,
    UsersComp,
    AuthPage,
  },
  data() {
    return {
      activePage: 1,
      currentUserId: 0,
      currentUserName: "",
      editableTask: null,
      isLogged: false,
      todosData: [],
      usersData: [],
      currentUserData: [],
    };
  },
  methods: {
    async getAllTodos() {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/todos`
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          this.todosData = result;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async getUsers() {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          this.usersData = result;
          if (result) {
            this.setCurrentUserName(result);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async getFilteringTodos(id) {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/?userId=${id}`
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          this.currentUserData = result;
          console.log(result);
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    changeActivePage(num) {
      this.activePage = num;
    },
    // filterData() {
    //   this.currentUserData = this.todosData.filter((task) => {
    //     return task.userId === this.currentUserId;
    //   });
    // },
    setLogin() {
      this.isLogged = !this.isLogged;
    },
    setCurrentUser(id) {
      this.currentUserId = id;
    },
    setCurrentUserName(users) {
      users.forEach(
        (user) =>
          user.id === this.currentUserId &&
          (this.currentUserName = user.username)
      );
    },
    removeTask(id) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      this.todosData = this.todosData.filter((todo) => {
        return todo.id !== id;
      });
      this.currentUserData = this.currentUserData.filter((todo) => {
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
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: task,
          userId: 1,
          complited: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then((json) => this.todosData.concat(json))
        .then(console.log(this.todosData));
    },
    toggleDoneTask(id) {
      this.currentUserData = this.currentUserData.map((task) => {
        task.id === id && (task.completed = !task.completed);
        return task;
      });
    },
  },
};
</script>

<style scoped></style>
