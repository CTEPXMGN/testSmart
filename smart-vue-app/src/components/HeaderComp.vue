<template>
  <header class="header">
    <h1 class="header__logo">{{ logo }}</h1>
    <nav class="header-menu">
      <ul class="header-menu__list">
        <li
          class="header-menu__item"
          v-for="(item, key) in menu"
          v-bind:key="key"
        >
          <a href="#" @click.prevent="$emit('changeActivePage', item.pageNum)">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
    <h2 class="header__name">Пользователь: {{ currentUserId }}</h2>
    <button class="header__button" @click="handleAuth">
      {{ isLogged ? "Выйти" : "Войти" }}
    </button>
  </header>
</template>

<script>
export default {
  emits: ["setLogin", "changeActivePage"],
  data() {
    return {
      logo: "Logo",
      menu: [
        { title: "Главная", pageNum: 1 },
        { title: "Все TODO", pageNum: 2 },
        { title: "Главная", pageNum: 3 },
      ],
    };
  },
  methods: {
    handleAuth() {
      this.$emit("setLogin");
    },
  },
  props: {
    isLogged: {
      type: String,
    },
    currentUserId: {
      type: Number,
    },
  },
};
</script>

<style scoped>
.header {
  height: 100px;
  display: grid;
  grid-template-columns: 150px 1fr 200px 150px;
  position: sticky;
  top: 0;
  align-content: center;
  background-color: #242424;
  border-bottom: 2px solid #fff;
  z-index: 1;
}

.header__logo,
.header__name,
.header__button {
  height: 40px;
  width: 85px;
  display: flex;
  justify-content: center;
  align-self: center;
}

.header__logo {
  margin: 30px;
  line-height: 40px;
}

.header-menu__list {
  display: flex;
  list-style: none;
  justify-content: center;
  line-height: 100px;
  gap: 20px;
}

.header-menu__item {
  text-transform: uppercase;
}

.header__name {
  font-size: 1em;
  width: 195px;
}
</style>
