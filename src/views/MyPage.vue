<template>
  <div class="my-page">
    <div class="mypage__header">
      <h1 class="guest__name">{{ user.name }}さん</h1>
      <button @click="back" class="mypage__button">トップページへ</button>
    </div>
    <div class="content">
      <ReservationStatus />
      <FavoriteShop />
    </div>
  </div>
</template>

<script>
import ReservationStatus from '@/components/ReservationStatus.vue'
import FavoriteShop from '@/components/FavoriteShop.vue'
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'MyPage',
  components: {
    ReservationStatus,
    FavoriteShop
  },
  data() {
    return {
      user: ''
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'ShopList'});
    }
  },
  mounted() {
    firebase
    .auth()
    .onAuthStateChanged(user => {
      axios.get('http://127.0.0.1:8000/api/v1/users/' + user.uid)
      .then((response) => {
        this.user = response.data.data
      })
    })
  }
}
</script>

<style>
  .content {
    display: flex;
    width: 100%;
    margin-top: 40px;
  }

  .mypage__header {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .guest__name {
    margin: 0;
  }

  .mypage__button {
    position: absolute;
    display: block;
    padding: 10px;
    right: 60px;
    border: none;
    background: blue;
    border-radius: 8px;
    color: white;
    font-weight: bold;
  }

</style>
