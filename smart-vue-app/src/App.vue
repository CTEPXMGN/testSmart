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
      :usersData="usersData"
      @removeTask="removeTask"
      @toggleDoneTask="toggleDoneTask"
      @addNewTask="addNewTask"
      @editTask="editTask"
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
    // Получение списка всех задач
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
    // Получение списка всех пользователей
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
    // Получение списка задач данного пользователя
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
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    // Смена страницы
    changeActivePage(num) {
      this.activePage = num;
    },
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
    // Удаление задачи
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
    // Редактирование задачи
    async editTask(title, id) {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              title: title,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          this.todosData = this.todosData.map((task) => {
            task.id === id && (task = result);
            return task;
          });
          this.currentUserData = this.currentUserData.map((task) => {
            task.id === id && (task = result);
            return task;
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    // Добавление задачи
    async addNewTask(task) {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
          {
            method: "POST",
            body: JSON.stringify({
              title: task,
              userId: this.currentUserId,
              complited: false,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          this.todosData = this.todosData.concat(result);
          this.currentUserData = this.currentUserData.concat(result);
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    // Чек выполнения задачи
    async toggleDoneTask(check, id) {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              completed: !check,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          this.todosData = this.todosData.map((task) => {
            task.id === id && (task = result);
            return task;
          });
          this.currentUserData = this.currentUserData.map((task) => {
            task.id === id && (task = result);
            return task;
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style scoped></style>
