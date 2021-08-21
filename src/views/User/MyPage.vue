<template>
  <div class="my-page">
    <div class="mypage__header">
      <h1 class="guest__name">{{ user.name }}さん</h1>
      <button @click="back" class="mypage__button">トップページへ</button>
    </div>
    <div class="content">
      <div class="sp-mode__select">
        <div class="selected__reservation-status">
          <button class="sp-mode__reservation-status" @click="windowReservationStatus">予約状況</button>
          <p class="selected-border" v-show="ReservationStatus"></p>
        </div>
        <div class="selected__favorite-shop">
          <button class="spmode__favorite-shop" @click="windowFavoriteShop">お気に入り店舗</button>
          <p class="selected-border" v-show="FavoriteShop"></p>
        </div>
      </div>

      <div class="pcmode__mypage">
        <ReservationStatus />
        <FavoriteShop />
      </div>

      <div v-show="ReservationStatus" class="spmode__reservation-status__components">
        <ReservationStatus />
      </div>
      <div v-show="FavoriteShop" class="spmode__favorite-shop__components">
        <FavoriteShop />
      </div>
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
      user: '',
      ReservationStatus: true,
      FavoriteShop: false
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'ShopList'});
    },
    windowReservationStatus() {
      this.ReservationStatus = true;
      this.FavoriteShop = false;
    },
    windowFavoriteShop() {
      this.ReservationStatus = false;
      this.FavoriteShop = true;
    }
  },
  mounted() {
    firebase
    .auth()
    .onAuthStateChanged(user => {
      if(!user) {
        this.$router.push('/rese')
      } else {
        axios.get('http://127.0.0.1:8000/api/v1/users/' + user.uid)
        .then((response) => {
          this.user = response.data.data
        })
      }
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
    cursor: pointer;
  }

  .sp-mode__select {
    display: none;
  }

  .pcmode__mypage {
    width: 100%;
    display: flex;
  }

  .spmode__reservation-status__components,
  .spmode__favorite-shop__components {
    display: none;
  }




  /* sp版 */

  @media screen and (max-width:480px){
    .spmode__reservation-status__components,
    .spmode__favorite-shop__components {
      display: block;
    }
    .my-page {
      width: 90%;
      margin: 0 auto;
    }
    .mypage__header {
      display: block;
      margin-top: 60px;
    }
    .content {
      display: block;
      width: 100%;
      margin-top: 20px;
    }
    .sp-mode__select {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }
    .sp-mode__reservation-status,
    .spmode__favorite-shop {
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 20px;
      border: none;
    }
    .mypage__button {
      display: none;
    }
    .selected-border {
      height: 4px;
      width: 100%;
      margin: 0;
      background: blue;
    }
    .pcmode__mypage {
      display: none;
    }
    .selected__reservation-status,
    .selected__favorite-shop {
      width: 100%;
    }
    .spmode__reservation-status__components {
      transition: 1s;
    }

  }
</style>
