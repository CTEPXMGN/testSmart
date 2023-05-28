<template>
  <div class="all-users">
    <table class="table">
      <tr>
        <th>№ ID</th>
        <th>Имя</th>
        <th>E-mail</th>
        <th>Телефон</th>
      </tr>
      <tr v-for="user in usersData" :key="user.id">
        <td class="user-id">{{ user.id }}</td>
        <td class="user-name">
          {{ user.name }}
        </td>
        <td class="user-email">{{ user.email }}</td>
        <td class="user-phone">{{ user.phone }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    usersData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.all-users {
  flex-grow: 1;
  padding-bottom: 100px;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 20px 0;
}

.user-id {
  width: 50px;
}

.user-name,
.user-email,
.user-phone {
  padding-left: 15px;
  text-align: left;
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
</style>
