<template>
  <div class="user-info">
    <h3>Информация о пользователе</h3>
    <ul class="user-info__list">
      <li class="user-info__item name">
        <strong>Имя:</strong> {{ anyUserData.name }}
      </li>
      <li class="user-info__item nick">
        <strong>Ник:</strong> {{ anyUserData.username }}
      </li>
      <li class="user-info__item address">
        <strong>Адрес:</strong> {{ anyUserData.address.city }},
        {{ anyUserData.address.street }}
      </li>
      <li class="user-info__item site">
        <strong>Сайт:</strong> {{ anyUserData.website }}
      </li>
      <li class="user-info__item company">
        <strong>Компания:</strong> {{ anyUserData.company.name }}
      </li>
      <li class="user-info__item geo">
        <strong>Геометка:</strong>
        {{ anyUserData.address.geo.lat }}
        {{ anyUserData.address.geo.lng }}
      </li>
    </ul>
    <button
      class="user-info__btn"
      @click="$emit('changeActivePage', lastActivePage)"
    >
      X
    </button>
  </div>
</template>

<script>
export default {
  props: {
    lastActivePage: {
      type: Number,
    },
    anyUserData: {
      type: Object,
    },
  },
  emits: ["changeActivePage"],
};
</script>

<style scoped>
.user-info {
  padding-left: 20px;
  position: relative;
}

.user-info__btn {
  position: fixed;
  top: 110px;
  right: 10px;
}
</style>
