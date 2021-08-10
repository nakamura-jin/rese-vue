<template>
  <div class="favorite-shop">
    <h2>お気に入り店舗</h2>
    <div v-show="noLikeShop"><p class="no__reservation">お気に入り店舗はありません</p></div>
    <div class="card">
      <div class="mypage__item" v-for="(like, index) in myLikeShops" :key="like.id">
        <img class="shop__image-middle" :src="like.image">
        <div class="info">
          <h3>{{ like.shopname }}</h3>
          <span class="shop__area">#{{ like.area_name }}</span>
          <span class="shop__genre">＃{{ like.genre_name }}</span>
        </div>
        <div class="shop__action">
          <button class="btn__detail" @click="shop_ditail(like.shop_id)">詳しく見る</button>
          <fa icon="heart" class="heart" size="2x" @click="deleteFavorite(like.id, index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
export default {
  name: 'FavoriteShop',
  data() {
    return {
      myLikeShops: [],
      noLikeShop: false
    }
  },
  methods:{
    myShop() {
      firebase
      .auth()
      .onAuthStateChanged((user) => {
        axios.get('http://127.0.0.1:8000/api/v1/users/' + user.uid + '/like')
        .then((response) => {
          this.myLikeShops = response.data.data
          if(this.myLikeShops == 0) {
            this.noLikeShop = !this.noLikeShop
          }
        })
      })
    },
    deleteFavorite(id, index) {
      axios.delete('http://127.0.0.1:8000/api/v1/shops/' + id + '/like')
      .then(() => {
        this.myLikeShops.splice(index, 1);
        alert('お気に入り登録が解除されました')
        this.myShop();
        if(this.myLikeShops == 0) {
          this.noReservation = !this.noReservation
        }
      })
    },

    shop_ditail(id) {
      this.$router.push({path: '/ditail', query: {id: id}})
    },
  },
  created() {
    this.myShop();
  }
}
</script>

<style>
  .favorite-shop {
    width: 50%;
  }

  .favorite-shop h2 {
    text-align: left;
  }
  .card {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .mypage__item {
    width: 300;
    height: 300px;
    margin: 0 20px 20px 0;
    background: white;
    border-radius: 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }
  .shop__image-middle {
    width: 300px;
    height: 160px;
    border-radius: 8px 8px 0 0 ;
  }
  .item {
    margin-left: 50px;
  }
  .info {
    padding: 16px;
    text-align: left;
  }
  .info h3 {
    font-weight: bold;
    margin: 0;
  }
  .shop__action {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
  }
  .heart {
    color: red;
  }
  .btn__detail {
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  .showInner {
    display: none;
  }
</style>