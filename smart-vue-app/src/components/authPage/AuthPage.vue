<template>
  <div className="auth__container">
    <p>Авторизация</p>
    <form action="submit" @submit.prevent="handleAuth">
      <input
        type="text"
        class="auth__input-login"
        placeholder="логин"
        v-model="this.login"
      />
      <input
        type="password"
        class="auth__input-password"
        placeholder="пароль"
        v-model="this.password"
      />
      <button class="auth__button">Войти</button>
    </form>
  </div>
</template>

<script>
import { saveUser } from "../../storage";
export default {
  emits: ["setLogin"],
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    handleAuth() {
      saveUser(this.login, this.password);
      this.$emit("setLogin");
    },
  },
};
</script>

<style scoped>
.auth__container {
  width: 200px;
  padding: 20px;
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid teal;
  border-radius: 10px;
}

.auth__container form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth__input-login {
  width: 95%;
  margin-bottom: 10px;
}

.auth__input-password {
  width: 95%;
  margin-bottom: 10px;
}

.auth__button {
  width: 80px;
  height: 40px;
  padding: 6px 12px;
}
</style>
