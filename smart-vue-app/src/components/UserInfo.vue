<template>
  <div class="user-info">
    <h3>Информация о пользователе</h3>
    <ul>
      <li><strong>Имя:</strong> {{ anyUserData.name }}</li>
      <li><strong>Ник:</strong> {{ anyUserData.username }}</li>
      <li>
        <strong>Адрес:</strong> {{ anyUserData.address.city }},
        {{ anyUserData.address.street }}
      </li>
      <li><strong>Сайт:</strong> {{ anyUserData.website }}</li>
      <li><strong>Компания:</strong> {{ anyUserData.company.name }}</li>
      <li>
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
  position: relative;
}

.user-info__btn {
  position: fixed;
  top: 110px;
  right: 10px;
}
</style>
