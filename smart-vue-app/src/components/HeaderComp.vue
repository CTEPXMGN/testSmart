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
          <a
            href="#"
            @click.prevent="$emit('changeActivePage', item.pageNum)"
            @click="handleCheck(item.pageNum)"
            :class="{ checked: item.checked }"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
    <h2 class="header__name">
      <span> {{ currentUserName }}</span>
    </h2>
    <button class="header__button" @click="handleAuth">
      <span> {{ isLogged ? "Выйти" : "Войти" }}</span>
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
        { title: "Главная", pageNum: 1, checked: true },
        { title: "Все TODO", pageNum: 2, checked: false },
        { title: "Пользователи", pageNum: 3, checked: false },
      ],
    };
  },
  methods: {
    handleAuth() {
      this.$emit("setLogin");
    },
    handleCheck(pageNum) {
      this.menu = this.menu.map((item) => {
        item.pageNum === pageNum
          ? (item.checked = true)
          : (item.checked = false);
        return item;
      });
    },
  },
  props: {
    isLogged: {
      type: String,
    },
    currentUserName: {
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

.header__button {
  margin: 0 auto;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  width: 195px;
}

.checked {
  color: teal;
}
</style>
