<template>
  <div class="rese">
    <div class="select">
      <p class="select__user" @click="go('user')">お客様用</p>
      <p class="select__owner" @click="go('owner')">店舗様用</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteTop',
  methods: {
    go(value) {
      if(value == 'user') {
        this.$router.push({name: 'Login'});
      } else {
        this.$router.push('owner/login')
      }
    }
  }
}
</script>

<style>
  .select {
    width: 80%;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .select__user, .select__owner {
    width: 30%;
    padding: 80px 0;
    background: blue;
    color: white;
    border-radius: 8px;
    font-size: 24px;
    cursor: pointer;
  }




  /* sp版 */
  @media screen and (max-width:480px){

    .select {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .select__user, .select__owner {
      width: 80%;
      padding: 40px 0;
      margin: 0 auto;
      background: blue;
      color: white;
      border-radius: 8px;
      font-size: 24px;
      cursor: pointer;
    }
    .select__user {
      margin-bottom: 20px;
    }
  }
</style>