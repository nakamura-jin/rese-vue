<template>
  <div class="pop">
    <p>ご予約ありがとうございます</p>
    <button class="btn__done" @click="back">戻る</button>
  </div>
</template>

<script>
export default {
  name: 'DonePop',
  methods: {
    back() {
      this.$router.push('/mypage')
    }
  }
}
</script>

<style>
  .pop {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
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

  .btn__done {
    border: none;
    padding: 6px 20px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
  }


</style>
