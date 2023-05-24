<template>
  <AuthPage
    v-if="!isLogged"
    @setLogin="setLogin"
    @setCurrentUser="setCurrentUser"
  />
  <div v-else>
    <header-comp :isLogged="isLogged" @setLogin="setLogin" />
    <main-comp
      :todosData="todosData"
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
      todosData: [
        // {
        //   userId: 1,
        //   id: 1,
        //   title: "delectus aut autem",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 2,
        //   title: "quis ut nam facilis et officia qui",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 3,
        //   title: "fugiat veniam minus",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 4,
        //   title: "et porro tempora",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 5,
        //   title:
        //     "laboriosam mollitia et enim quasi adipisci quia provident illum",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 6,
        //   title: "qui ullam ratione quibusdam voluptatem quia omnis",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 7,
        //   title: "illo expedita consequatur quia in",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 8,
        //   title: "quo adipisci enim quam ut ab",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 9,
        //   title: "molestiae perspiciatis ipsa",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 10,
        //   title: "illo est ratione doloremque quia maiores aut",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 11,
        //   title: "vero rerum temporibus dolor",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 12,
        //   title: "ipsa repellendus fugit nisi",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 13,
        //   title: "et doloremque nulla",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 14,
        //   title: "repellendus sunt dolores architecto voluptatum",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 15,
        //   title: "ab voluptatum amet voluptas",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 16,
        //   title: "accusamus eos facilis sint et aut voluptatem",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 17,
        //   title: "quo laboriosam deleniti aut qui",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 18,
        //   title: "dolorum est consequatur ea mollitia in culpa",
        //   completed: false,
        // },
        // {
        //   userId: 1,
        //   id: 19,
        //   title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
        //   completed: true,
        // },
        // {
        //   userId: 1,
        //   id: 20,
        //   title: "ullam nobis libero sapiente ad optio sint",
        //   completed: true,
        // },
      ],
    };
  },
  methods: {
    async getTodos() {
      try {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${this.currentUserId}`
        );
        if (!response.ok) {
          console.log("Error " + response.status);
        } else {
          const result = await response.json();
          console.log(result);
          this.todosData = result;
        }
      } catch {
        console.log(err.message);
      }
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
  mounted() {
    this.getTodos();
  },
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
