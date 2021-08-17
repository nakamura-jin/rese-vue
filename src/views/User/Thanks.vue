<template>
  <div class="pop">
    <div class="pop__card">
      <div class="pop__inner">
        <h2 class="pop__title">会員登録ありがとうございます</h2>
        <p class="pop__text">登録メールをご確認後ログインが可能です。</p>
        <button class="btn__thanks" @click="go_to_login">ログインする</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThanksPop',
  methods: {
    go_to_login() {
      this.$router.push('/login');
    },
  }
}
</script>

<style>
  .pop {
    width: 90%;
    margin: 0 auto;
  }
  .pop__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    width: 30%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }
  .pop__inner {
    padding: 20px;
  }
  .pop__title {
    font-size: 24px;
  }
  .pop__text {
    font-size: 16px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 60px;
  }
  .btn__thanks {
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }



  /* sp版 */
@media screen and (max-width:480px) {
  .pop__card {
    width: 80%;
  }
  .pop__title {
    font-size: 16px;
  }
  .pop__text {
    font-size: 8px;
  }
}
</style>

