<template>
  <div class="shop__ditail">
    <div class="shop">
      <div class="shop-name">
        <button class="back" @click="back">&lt;</button>
        <h2>{{ setShop.shopname }}</h2>
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
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase'
export default {
  name: 'ShopDitail',
  data() {
    return {
      shop_id: this.$route.query.id,
      setShop: [],
      shopData: [],
      date: '',
      time: '10:00',
      people: 1,
    }
  },
  methods: {
    back() {
      this.$router.push('/');
    },
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
        this.$router.push('/done')
      })
    }
  },
  mounted() {
    // ショップデータ取得
    axios.get('http://127.0.0.1:8000/api/v1/shops/' + this.shop_id)
    .then((response) => {
      this.setShop = response.data.data
    })
    //
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
</style>