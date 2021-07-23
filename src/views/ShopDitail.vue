<template>
  <div class="shop__ditail">
    <div class="shop">
      <div class="shop-name">
        <button class="back" @click="back">&lt;</button>
        <h2>{{ setShop.shopname }}</h2>

        <!-- 店舗評価 -->
          <div class="star__shop-ditail">
            <!-- 0 〜 0.4 -->
            <template v-if="total(setShop) < 0.5">
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 0.5 〜 1 -->
            <template v-if="0.5 <= total(setShop) && total(setShop) < 1">
              <fa icon="star-half-alt" class="star__color"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 1 〜 1.4 -->
            <template v-if="1 <= total(setShop) && total(setShop) < 1.5">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 1.5 〜 2 -->
            <template v-if="1.5 <= total(setShop) && total(setShop) < 2">
              <fa icon="star" class="star__color" />
              <fa icon="star-half-alt" class="star__color"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 2 〜 2.4 -->
            <template v-if="2 <= total(setShop) && total(setShop) < 2.5">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 2.5 〜 3 -->
            <template  v-if="2.5 <= total(setShop) && total(setShop) < 3">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star-half-alt" class="star__color"/>
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 3 〜 3.4 -->
            <template v-if="3 <= total(setShop) && total(setShop) < 3.5">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__base"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 3.5 〜 4 -->
            <template v-if="3.5 <= total(setShop) && total(setShop) < 4">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star-half-alt" class="star__color"/>
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 4 〜 4.4 -->
            <template v-if="4 <= total(setShop) && total(setShop) < 4.5">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__base"/>
            </template>
            <!-- 4.5 〜 4.9 -->
            <template v-if="4.5 <= total(setShop) && total(setShop) < 5">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star-half-alt" class="star__color"/>
            </template>
            <!-- 5 -->
            <template v-if="total(setShop) == 5">
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
              <fa icon="star" class="star__color" />
            </template>
            <!-- 評価値 -->
            <span class="review">{{ total(setShop).toFixed(1) }}</span>
          </div>
        <!-- 店舗評価ここまで -->

        <button class="rating" v-if="isPush == false" @click="openModal(setShop)">評価する</button>
      </div>

      <img class="shop__image-big" :src="setShop.image" alt="店舗画像">
      <div class="category">
        <span class="area">#{{ setShop.area_name }}</span>
        <span class="genre">#{{ setShop.genre_name }}</span>
      </div>
      <div class="discription">
        <p>{{ setShop.overview }}</p>
      </div>
    </div>

    <!--  予約表  -->
    <div class="ReservationBoard">
      <div class="board__inner">
        <h2>予約</h2>
        <!-- 日付  -->
          <input type="date" class="date" v-model="date">
        <!-- 時間  -->
        <select type="time" class="time" v-model="time">
          <option>10:00</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>13:00</option>
          <option>14:00</option>
          <option>15:00</option>
          <option>16:00</option>
          <option>17:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
          <option>21:00</option>
          <option>22:00</option>
        </select>
        <!-- 人数  -->
        <select class="people" v-model="people">
          <option value="1">1名</option>
          <option value="2">2名</option>
          <option value="3">3名</option>
          <option value="4">4名</option>
          <option value="5">5名</option>
          <option value="6">6名</option>
          <option value="7">7名</option>
          <option value="8">8名</option>
          <option value="9">9名</option>
          <option value="10">10名</option>
        </select>

        <table class="confirmation">
          <tr>
            <th>Shop</th>
            <td>{{ setShop.shopname }}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{{ date }}</td>
          </tr>
          <tr>
            <th>Time</th>
            <td>{{ time }}</td>
          </tr>
          <tr>
            <th>Number</th>
            <td>{{ people }}名</td>
          </tr>
        </table>
      </div>
      <button class="decision" @click="reservation">予約する</button>
    </div>
    <!-- ここまで予約表 -->

    <!-- モーダル -->
    <div class="modal" :class="{ toggle: modalDisplay }">
      <div class="container">
        <div class="modal__inner">
          <p v-if="rated">評価登録しました</p>

          <!-- 評価する星 -->
          <star-rating
                v-bind:increment="0.5"
                v-bind:max-rating="5"
                inactive-color="#ddd"
                active-color="goldenrod"
                v-bind:star-size="50"
                v-model="star">
          </star-rating>

          <div class="modal__button">
            <!-- 評価済みかどうかで表示を変える -->
            <button class="modal__rating" v-if="isPush == true" :disabled="isPush" @click="myRating">評価済みです</button>
            <button class="modal__rating" v-else :disabled="isPush" @click="myRating">評価する</button>
            <!-- モーダル閉じる -->
            <button class="modal__close" @click="closeModal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ここまでモーダル -->

  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import StarRating from 'vue-star-rating'

export default {
  name: 'ShopDitail',
  components: {
    StarRating,
  },
  data() {
    return {
      shop_id: this.$route.query.id,
      logUser: '',
      setShop: [],
      shopData: [],
      date: '',
      time: '10:00',
      people: 1,

      // モーダル内
      star: '',
      modalDisplay: true,
      rated: false,
      isPush: false
    }
  },
  methods: {
    // 前のページに戻る
    back() {
      this.$router.push('/');
    },

    // 予約登録する
    reservation() {
      firebase
      .auth()
      .onAuthStateChanged((user) => {
        const reservationData = {
          user_id: user.uid,
          shop_id: this.shop_id,
          date: this.date,
          time: this.time,
          people: this.people
        };
        axios.post('http://127.0.0.1:8000/api/v1/shops/' + this.shop_id + '/reservation', reservationData)
        console.log(reservationData)
        this.$router.push('/done')
      })
    },

    // 店舗評価値
    total(setShop){
      const makeReview = setShop.review
      let sum = 0;
      for(let i = 0; i < makeReview.length; i++) {
        sum += makeReview[i].star
      }
      if(makeReview == '') {
        return 0
      } else {
        return parseFloat(sum) / makeReview.length
      }
    },

    // 評価する
    myRating() {
      firebase
      .auth()
      .onAuthStateChanged((user) => {
        const sendRating = {
          user_id: user.uid,
          shop_id: this.shop_id,
          star: this.star
        };
        axios.post('http://127.0.0.1:8000/api/v1/shops/' + this.shop_id + '/review', sendRating)
        console.log(sendRating)
        this.rated = !this.rated
        this.isPush = !this.isPush
      })
    },

    // モーダル出す 評価済みかどうかの確認も行う
    openModal(setShop){
      this.modalDisplay = !this.modalDisplay
      firebase
      .auth()
      .onAuthStateChanged((user) => {
        var checkRated = JSON.parse(JSON.stringify(setShop.review))
        for(let i = 0; i < checkRated.length; i++) {
          if(checkRated[i].user_id == user.uid) {
            this.isPush = !this.isPush
          }
        }
      })
    },
    // モーダル閉じる
    closeModal(){
      this.modalDisplay = true
    }
  },
  mounted() {
    // ショップデータ取得
    axios.get('http://127.0.0.1:8000/api/v1/shops/' + this.shop_id)
    .then((response) => {
      this.setShop = response.data.data
    })
    //
  },
  created() {
    this.total();
  }
}
</script>

<style>
.shop__ditail {
  display: flex;
}

.shop {
  width: 42%;
  margin: 60px;
}
.back {
  width: 36px;
  height: 36px;
  margin: 0px;
  border-radius: 8px;
  font-size: 24px;
  border: none;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  background: white;
}
.shop-name {
  display: flex;
}
.shop-name h2 {
  margin: 0 0 0 10px;
  font-weight: bold;
}
button {
  display: inline;
}

.shop__image-big {
  width: 100%;
  margin: 30px 0;
}
.category {
  text-align: left;
}
.area, .genre {
  margin: 0 10px 0 0;
  font-size: 16px;
  text-align: left;
}

.discription {
  text-align: left;
  margin-top: 30px;
}

/*
予約表デザイン
*/

.ReservationBoard {
  position: relative;
  width: 42%;
  height: 700px;
  background: blue;
  border-radius: 8px;
}

.board__inner {
  text-align: left;
  padding: 10px 30px;
  color: white;
}

.date {
  width: 200px;
  padding: 6px;
  display: block;
}

.time, .people {
  width: 500px;
  padding: 10px;
}

.date, .time, .people {
  margin-bottom: 16px;
  border: none;
  border-radius: 8px;
}

.confirmation {
  width: 500px;
  background: rgb(0, 102, 255);
  border-radius: 8px;
  padding: 10px 20px;
}

.confirmation th {
  width: 100px;
}

.confirmation td {
  font-weight: bold;
}

.decision {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(4, 0, 255, 0.712);
  border-radius: 0 0 8px 8px;
  font-weight: bold;
  font-size: 16px;
  color: white;
}

/* 店舗評価 */

.star__shop-ditail {
  margin-left: 40px;
  font-size: 20px;
  margin-top: 4px;
}

.rating {
  margin-left: 20px;
  padding: 0 10px;
  background: goldenrod;
  border: none;
  border-radius: 4px;
}


/* モーダル */

.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  z-index: 1;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 40%;
  background: white;
  border-radius: 4px;
}

.modal__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vue-star-rating-rating-text {
  color: goldenrod;
  font-size: 30px;
}

.modal__button {
  margin-top: 40px;
}

.modal__rating, .modal__close {
  display: flex;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: goldenrod;
}

.toggle {
  display: none;
}
</style>