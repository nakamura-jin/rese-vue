<template>
  <div class="pop">
    <p>会員登録ありがとうございます</p>
    <button class="btn__thanks" @click="go_to_login">ログインする</button>
  </div>
</template>

<script>
export default {
  name: 'ThanksPop',
  methods: {
    go_to_login() {
      this.$router.push('/login');
    }
  }
}
</script>

<style>
  .pop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: white;
    border-radius: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }

  .pop p {
    font-size: 24px;
  }

  .btn__thanks {
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
  }


</style>






<style>
  .thanks-pop {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
