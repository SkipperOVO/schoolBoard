<template>
  <div class="user-head-box-simple">
    <div class="user-icon"><img :src="avatarLink" height="25rem" width="25rem"/></div>
  </div>
</template>

<script>
export default {
  name: "UserHeadBoxSimple",
  props: ['avatarLink']
}
</script>

<style scoped>

.user-head-box-simple {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}


.user-icon img {
  background-color: gray;
  height: 1.194rem;
  width: 1.194rem;
  border-radius: 2.653rem;
}


</style>