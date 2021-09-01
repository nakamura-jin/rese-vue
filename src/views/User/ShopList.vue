<template>
  <div class="shop-list">
    <Loading v-show="loading"></Loading>
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
    </div>
    <div class="shop__item" v-for="shop in filteredShops" :key="shop.id">
      <img class="shop__image-small" :src="shop.image">
      <div class="info">
        <h3>{{ shop.shopname }}</h3>

      <!-- 店舗評価 -->
        <div class="star">
          <!-- 0 〜 0.4 -->
          <template v-if="getReview(shop.review) < 0.5">
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 0.5 〜 1 -->
          <template v-if="0.5 <= getReview(shop.review) && getReview(shop.review) < 1">
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 1 〜 1.4 -->
          <template v-if="1 <= getReview(shop.review) && getReview(shop.review) < 1.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 1.5 〜 2 -->
          <template v-if="1.5 <= getReview(shop.review) && getReview(shop.review) < 2">
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 2 〜 2.4 -->
          <template v-if="2 <= getReview(shop.review) && getReview(shop.review) < 2.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 2.5 〜 3 -->
          <template  v-if="2.5 <= getReview(shop.review) && getReview(shop.review) < 3">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 3 〜 3.4 -->
          <template v-if="3 <= getReview(shop.review) && getReview(shop.review) < 3.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 3.5 〜 4 -->
          <template v-if="3.5 <= getReview(shop.review) && getReview(shop.review) < 4">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 4 〜 4.4 -->
          <template v-if="4 <= getReview(shop.review) && getReview(shop.review) < 4.5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__base"/>
          </template>
          <!-- 4.5 〜 4.9 -->
          <template v-if="4.5 <= getReview(shop.review) && getReview(shop.review) < 5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star-half-alt" class="star__color"/>
          </template>
          <!-- 5 -->
          <template v-if="getReview(shop.review) == 5">
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
            <fa icon="star" class="star__color" />
          </template>
          <span class="review">{{ getReview(shop.review) }}</span>
          <span class="review__count">({{ shop.review.length }}件)</span>
          <span class="review__reviewed" v-if="reviewed(shop.review)">評価済み</span>
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
import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      shops: [],
      likes: [],
      tUser: '',
      getShopReview: [],
      setShopReview: '',
      makeURL: [],
      // お店検索
      area: '',
      genre: '',
      word: '',

      shopStar: [],
      loading: true,
    }
  },
  methods: {
    getShop(){
      // お店一覧取得
      firebase
      .auth()
      .onAuthStateChanged(user => {
        if(!user) {
          this.$router.push({name: 'SiteTop'})
        } else {
          axios.get('https://rese-app.herokuapp.com/api/v1/shops')
          .then((response) => {
            this.shops = response.data.data;
            this.tUser = user.uid
            // ログインユーザーのお気に入り取得
            axios.get('https://rese-app.herokuapp.com/api/v1/users/' + this.tUser + '/like')
            .then((response) => {
              this.likes = response.data.data
            })
          })
        }
      })
    },

    // レビュー表示
    getReview(review) {
      if(review.length != 0) {
        let sum = 0;
        for(let i = 0; i < review.length; i++) {
          sum += Number(review[i].star)
        }
        return (sum / review.length).toFixed(1)
      } else {
        return 0
      }
    },

    reviewed(shop) {
      if(shop.length != 0) {
        for(let i = 0; i < shop.length; i++) {
          if(this.tUser == shop[i].user_id) {
            return true
          }
        }
      }
    },

    // ハートマーク色選択
    isActive(id) {
      const isLike = this.likes.some(value => {
        return value.shop_id === id
      });
      if(isLike) {
        return true;
      } else {
        return false;
      }
    },

    // お店詳細へ遷移
    shop_ditail(id) {
      this.$router.push({path: '/ditail', query: {id: id}})
    },

    // いいね機能実装
    changeLike(id) {
      const sendLike = {
        user_id: this.tUser,
        shop_id: id
      }
      let value =
      this.likes.some(like => {
        let check = like.shop_id == id
        if(check) {
          axios.delete('https://rese-app.herokuapp.com/api/v1/shops/' + like.id + '/like')
          alert('お気に入りは解除されました', sendLike)
          this.index = !this.isActive
          this.getShop()
          return true
        } else {
          return false
        }
      })
      if(value == false) {
        axios.post('https://rese-app.herokuapp.com/api/v1/shops/' + id + '/like', sendLike)
        alert('お気に入り登録しました')
        this.getShop()
      }
    },

      // マイページへ遷移
    mypage() {
      this.$router.push({name: 'MyPage'})
    },

    // ログアウト
    logout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push({name: 'Login'})
      })
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
  computed: {
    // お店検索
    filteredShops() {
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
    cursor: pointer;
  }

  .logout__button {
    margin-left: 10px;
    padding: 0 10px;
    background: blue;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
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

  .review__count {
    margin-left: 10px;
  }

  .review__reviewed {
    font-size: 12px;
    margin-left: 10px;
    color: #888;
  }

  .star__base {
    display: inline;
    color: #ddd;
  }
  .star__color {
    color: goldenrod;
  }










/* sp版 */
@media screen and (max-width:480px){
  .shop-list {
    width: 100%;
    display: block;
    flex-wrap: nowrap;
  }
  .search-component {
    display: block;
    position: static;
    width: 100%;
    margin: 0 auto;
  }

  .mypage-link__button,
  .logout__button {
    display: none;
  }

  .shop__item {
    margin: 20px auto;
    width: 90%;
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
    width: 90%;
    height: 36px;
    margin: 0 auto;
    background: white;
    text-align: left;
    line-height: 36px;
    padding: 6px;
    border-radius: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }
  .select__area, .select__genre {
    width: 20%;
    height: 26px;
    margin-left: 2px;
    font-size: 0.5em;
    border: none;
    font-size: 12px;
  }

  .search-bar {
    width: 38%;
    height: 20px;
    border: none;
    font-size: 12px;
  }
  .search-icon {
    margin-left: 6px;
    margin-right: 6px;
    color: gray;
    font-size: 12px;
  }


  /* 店舗評価 */

  .review {
    margin-left: 10px;
  }

  .review__count {
    margin-left: 10px;
  }

  .review__reviewed {
    font-size: 12px;
    margin-left: 10px;
    color: #888;
  }

  .star__base {
    display: inline;
    color: #ddd;
  }
  .star__color {
    color: goldenrod;
  }
}

</style>