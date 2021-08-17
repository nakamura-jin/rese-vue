<template>
  <div class="pop-owner-thanks">
    <div class="pop-owner__card">
      <div class="pop-owner__inner">
        <p class="pop-owner-thanks__title">会員登録ありがとうございます</p>
        <button class="btn__thanks" @click="go_to_owner_login">ログインする</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OwnerThanks',
  methods: {
    go_to_owner_login() {
      this.$router.push('/owner/login');
    },
  },
}
</script>

<style>
  .pop-owner__card {
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

  .pop-owner__inner {
    padding: 20px;
  }

  .pop-owner-thanks__title {
    font-size: 24px;
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
    .pop-owner__card {
      width: 80%;
    }
    .pop-owner-thanks__title {
      font-size: 16px;
    }
    .btn__thanks {
      margin-top: 60px;
    }
  }


</style>

