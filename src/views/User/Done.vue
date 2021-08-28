<template>
  <div class="pop-done">
    <div class="pop-done__card">
      <div class="pop-done__inner">
        <h2 class="pop-done__title">予約が登録されました</h2>
        <button class="btn__done" @click="back">戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonePop',
  methods: {
    back() {
      this.$router.push({name: 'MyPage'})
    }
  }
}
</script>

<style>
  .pop-done__card {
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
  .pop-done__inner {
    padding: 20px;
  }
  .pop-done__title {
    font-size: 24px;
  }

  .btn__done {
    margin-top: 30px;
    border: none;
    padding: 6px 20px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }



    /* sp版 */
@media screen and (max-width:480px) {
  .pop-done__card {
    width: 80%;
  }
  .pop-done__title {
    font-size: 16px;
  }
}

</style>
