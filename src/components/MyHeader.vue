<template>
  <div class="header">
    <MyLogo class="header-logo" />
    <MyUser class="header-user" />
  </div>
</template>

<script >
import MyLogo from "../asset/MyLogo.vue";
import MyUser from "../asset/MyUser.vue";

export default {
  components: {
    MyLogo,
    MyUser,
  },
  setup() {},
};
</script>

<style >
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
}

.header-logo{

  scale: 0.75;
}


</style>
