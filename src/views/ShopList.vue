<template>
  <div class="shop-list">
    <div class="search-component">
      <!-- 検索 -->
      <div class="search">
        <div>
          <!-- エリア -->
          <select name="area" class="select__area" v-model="area">
            <option value="">all area</option>
            <option>東京</option>
            <option>大阪</option>
            <option>福岡</option>
          </select>
          <!-- ここまでエリア -->

          <!-- ジャンル -->
          <select name="genre" class="select__genre" v-model="genre">
            <option value="">all genre</option>
            <option>寿司</option>
            <option>焼肉</option>
            <option>居酒屋</option>
            <option>イタリアン</option>
            <option>ラーメン</option>
          </select>
          <!-- ここまでジャンル -->

          <!-- 文字検索 -->
          <fa icon="search" class="search-icon" />
          <input name="word" type="text" class="search-bar" placeholder="Search ..." v-model="word">
        </div>
      </div>
      <!-- ここまで -->

      <button class="mypage-link__button" @click="mypage">マイページへ</button>
      <button class="logout__button" @click="logout">ログアウト</button>
      <p>{{ $store.state.user_id }}</p>
    </div>
    <div class="shop__item" v-for="shop in filteredShops" :key="shop.id">
      <img class="shop__image-small" :src="shop.image">
      <div class="info">
        <h3>{{ shop.shopname }}</h3>

      <!-- 店舗評価 -->
        <div class="star">
          <!-- 0 〜 0.4 -->
          <template v-if="total(shop) < 0.5">
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 0.5 〜 1 -->
          <template v-if="0.5 <= total(shop) && total(shop) < 1">
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 1 〜 1.4 -->
          <template v-if="1 <= total(shop) && total(shop) < 1.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 1.5 〜 2 -->
          <template v-if="1.5 <= total(shop) && total(shop) < 2">
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 2 〜 2.4 -->
          <template v-if="2 <= total(shop) && total(shop) < 2.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 2.5 〜 3 -->
          <template  v-if="2.5 <= total(shop) && total(shop) < 3">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 3 〜 3.4 -->
          <template v-if="3 <= total(shop) && total(shop) < 3.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 3.5 〜 4 -->
          <template v-if="3.5 <= total(shop) && total(shop) < 4">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 4 〜 4.4 -->
          <template v-if="4 <= total(shop) && total(shop) < 4.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 4.5 〜 4.9 -->
          <template v-if="4.5 <= total(shop) && total(shop) < 5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
          </template>
          <!-- 5 -->
          <template v-if="total(shop) == 5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
          </template>
          <span class="review" type="decimal">{{ total(shop).toFixed(1) }}</span>
        </div>
      <!-- 店舗評価ここまで -->

        <span class="shop__area">＃{{ shop.area_name }}</span>
        <span class="shop__genre">＃{{ shop.genre_name }}</span>
      </div>
      <div class="shop__action">
        <button class="btn__detail" @click="shop_ditail(shop.id)">詳しく見る</button>
        <fa v-if="isActive(shop.id)" @click="changeLike(shop.id)" icon="heart" size="2x" class="like"/>
        <fa v-else @click="changeLike(shop.id)" icon="heart" size="2x" class="base"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'

export default {
  data() {
    return {
      shops: [],
      likes: [],
      tUser: '',
      // お店検索
      area: '',
      genre: '',
      word: '',
    }
  },
  methods: {
    getShop(){
      // お店一覧取得
      firebase
      .auth()
      .onAuthStateChanged(user => {
        axios.get('http://127.0.0.1:8000/api/v1/shops')
        .then((response) => {
          this.shops = response.data.data;
          this.tUser = user.uid
          // ログインユーザーのお気に入り取得
          axios.get('http://127.0.0.1:8000/api/v1/users/' + this.tUser + '/like')
          .then((response) => {
            this.likes = response.data.data
          })
        })
      })
    },
    isActive(id) {
      // ハートマーク色選択
      const isLike = this.likes.some(value => {
        return value.shop_id === id
      });
      if(isLike) {
        return true;
      } else {
        return false;
      }
    },
    shop_ditail(id) {
      // お店詳細へ遷移
      this.$router.push({path: '/ditail', query: {id: id}})
    },

    changeLike(id) {
      // いいね機能実装
      const sendLike = {
        user_id: this.tUser,
        shop_id: id
      }
      let value =
      this.likes.some(like => {
        let check = like.shop_id == id
        if(check) {
          axios.delete('http://127.0.0.1:8000/api/v1/shops/' + like.id + '/like')
          alert('お気に入りは解除されました', sendLike)
          this.index = !this.isActive
          this.getShop()
          return true
        } else {
          return false
        }
      })
      if(value == false) {
        axios.post('http://127.0.0.1:8000/api/v1/shops/' + id + '/like', sendLike)
        alert('お気に入り登録しました')
        this.getShop()
      }
    },
    mypage() {
      // マイページへ遷移
      this.$router.push('/mypage')
    },

    logout() {
      // ログアウト
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/login')
      })
    },

    total(shop){
      // 店舗評価値
      const makeReview = shop.review
      let sum = 0;
      for(let i = 0; i < makeReview.length; i++) {
        sum += makeReview[i].star
      }
      if(makeReview == '') {
        return 0
      } else {
        console.log(sum)
        return parseFloat(sum) / makeReview.length
      }
    }
  },
  computed: {
    filteredShops() {
      // お店検索
      let shopsArray = [];
      if (this.area !== "" || this.genre !== "" ||this.word !== "") {
        for (const i in this.shops) {
          const shop = this.shops[i];
          if (
            shop.area_name.indexOf(this.area) !== -1
            &&
            shop.genre_name.indexOf(this.genre) !== -1
            &&
            shop.shopname.indexOf(this.word) !== -1) {
          shopsArray.push(shop);
          }
        }
        return shopsArray;
      }
      return this.shops;
    },
  },
  created() {
    this.getShop();
  },
}
</script>


<style>
  .search-component {
    display: flex;
    position: absolute;
    top: 30px;
    right: 100px;
  }

  .mypage-link__button {
    margin-left: 10px;
    padding: 0 10px;
    background: blue;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
  }

  .logout__button {
    margin-left: 10px;
    padding: 0 10px;
    background: blue;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
  }

  .shop-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 60px;
  }

  .shop__item {
    margin: 20px 10px;
    width: 23%;
    height: 300px;
    background: white;
    border-radius: 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }

  .shop__image-small {
    width: 100%;
    height: 140px;
    border-radius: 8px 8px 0 0 ;
  }

  .shop__area, .shop__genre {
    font-size: 10px;
    border: none;
    font-weight: bold;
  }

  .shop__area {
    margin-left: 0;
  }

  .like {
    color: red
  }

  .base {
    color: #ddd;
  }


/* 検索 */
.search {
    width: 600px;
    height: 36px;
    background: white;
    text-align: left;
    line-height: 36px;
    padding: 6px;
    border-radius: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }
  .select__area, .select__genre {
    width: 110px;
    height: 26px;
    margin-left: 6px;
    font-size: 16px;
    border: none;
  }

  .search-bar {
    width: 280px;
    height: 20px;
    border: none;
  }
  .search-icon {
    margin-left: 10px;
    margin-right: 6px;
    color: gray;
  }


  /* 店舗評価 */

  .review {
    margin-left: 10px;
  }

  .star__base {
    display: inline;
    color: #ddd;
  }
  .star__color {
    color: goldenrod;
  }
</style>