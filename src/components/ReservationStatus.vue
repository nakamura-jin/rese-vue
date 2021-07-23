<template>
  <div class="reservation-status">
    <h2>予約状況</h2>
    <div v-show="noReservation"><p class="no__reservation">予約はありません</p></div>
    <div class="status"  v-for="(reservation, index) in reservations" :key="reservation.id">
      <div class="status__item">
        <div class="status__title">
          <fa icon="clock" class="clock" />
          <p>予約</p>
        </div>
        <table>
          <tr>
            <th>Shop</th>
            <td>{{ reservation.shopname }}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{{ reservation.date }}</td>
          </tr>
          <tr>
            <th>Time</th>
            <td>{{ reservation.time }}</td>
          </tr>
          <tr>
            <th>Number</th>
            <td>{{ reservation.people }} 名</td>
          </tr>
        </table>
      </div>
      <button class="reservation__edit" @click="reservationEdit(reservation.id)">内容を変更する</button>
      <fa icon="times-circle" class="clock" style="Regular" @click="reservationDelete(reservation.id, index)"/>
    </div>
      <!-- モーダル -->
        <div class="reservation__modal" :class="{ reservationModal: isEdit }">
          <div class="reservation__modal-container">
            <div class="reservation__modal-inner">
              <div v-if="beforeUpdate">
                <table>
                  <tr>
                    <th>Shop</th>
                    <td>{{ reservationShop.shopname }}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td><input type="date" class="update__date" v-model="updateDate"></td>
                  </tr>
                  <tr>
                    <th>Time</th>
                    <td>
                      <select type="time" class="update__time" v-model="updateTime">
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
                    </td>
                  </tr>
                  <tr>
                    <th>Number</th>
                    <td>
                      <select class="update__people" v-model="updatePeople">
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
                    </td>
                  </tr>
                </table>
                <div class="reservation-edit__button">
                  <button class="reservation-update__button" @click="reservationUpdate(reservationShop.id)">変更する</button>
                  <button class="reservation-update-close__button" @click="closeReservationModal">閉じる</button>
                </div>
              </div>
              <div v-else>
                <p class="updated">予約変更しました</p>
                <button class="reservation-update-close__button" @click="closeReservationModal">閉じる</button>
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
export default {
  name: 'ReservationStatus',
  data() {
    return {
      reservations: [],
      user: '',
      noReservation: false,
      // モーダル
      isEdit: true,
      reservationShop: [],
      updateDate: '',
      updateTime: '',
      updatePeople: '',
      beforeUpdate: true
    }
  },
  methods: {
    // 予約情報表示
    getReservation(){
      firebase
      .auth()
      .onAuthStateChanged(user => {
        axios.get('http://127.0.0.1:8000/api/v1/users/' + user.uid + '/reservations')
        .then((response) => {
          this.reservations = response.data.data;

          // 予約の時間順に並び替える
          this.reservations.sort(function(a, b) {
            if (a.time < b.time) {
                return -1;
            } else {
                return 1;
            }
          });

          // 予約の日にち順に並び替える
          this.reservations.sort(function(a, b) {
            if (a.date < b.date) {
                return -1;
            } else {
                return 1;
            }
          });

          // 予約がなければ、「予約はありません」と表示する
          if(this.reservations == 0) {
            this.noReservation = !this.noReservation
          }
        })
      })
    },

    // 予約変更する情報取得
    reservationEdit(id) {
      this.isEdit = !this.isEdit
      axios.get('http://127.0.0.1:8000/api/v1/shops/reservation/' + id)
      .then((response) => {
        this.reservationShop = response.data.data
      })
    },

    // 予約変更登録
    reservationUpdate(id) {
      const reservationUpdateData = {
        date: this.updateDate,
        time: this.updateTime,
        people: this.updatePeople
      };
      axios.put('http://127.0.0.1:8000/api/v1/shops/reservation/' + id , reservationUpdateData)
      .then(() => {
        console.log(id, reservationUpdateData)
        this.beforeUpdate = !this.beforeUpdate
        // 入力データを初期値に戻す
        this.updateDate = "",
        this.updateTime = '',
        this.updatePeople = '',
        // 予約情報を最新に書き換える
        this.getReservation()
      })
    },

    // モーダル閉じる
    closeReservationModal() {
      this.isEdit = true
      this.beforeUpdate = true
    },

    // 予約削除
    reservationDelete(id, index) {
      axios.delete('http://127.0.0.1:8000/api/v1/shops/reservation/' + id)
      .then(() => {
        this.reservations.splice(index, 1);
        alert('ご予約はキャンセルされました')
        this.getReservation();
        if(this.reservations == 0) {
          this.noReservation = !this.noReservation
        }
      })
    },
  },
  created() {
    this.getReservation()
  },
}
</script>

<style>
  .reservation-status {
    width: 50%;
  }

  .reservation-status h2 {
    text-align: left;
  }

  .no__reservation {
    font-size: 36px;
    margin-top: 100px;
  }

  .status {
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: 240px;
    margin-bottom: 30px;
    font-weight: bold;
    border-radius: 10px;
    padding: 30px;
    background: blue;
    color: white;
  }

  .status__item {
    display: flex;
    flex-direction: column;
  }
  .status__item p {
    margin: 0 0 0 20px;
    text-align: center;
  }
  .status__title {
    display: flex;
    margin-bottom: 20px;
  }

  .reservation__edit {
    height: 30px;
    margin-top: -5px;
    border: none;
    border-radius: 4px;
    color: blue;
    font-weight: bold;
    background: white;
  }

  .clock {
    transform: scale(1.5);
  }
  table {
    text-align: left;
  }
  th, td {
    padding: 10px;
  }

  /* モーダル */
  .reservationModal {
    display: none;
  }

  .reservation__modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    z-index: 1;
  }

  .reservation__modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    background: white;
    border-radius: 4px;
  }

  .reservation__modal-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .update__date, .update__time, .update__people {
  border: none;
  border-radius: 8px;
  }

  .update__time {
    width: 380px;
  }

  .update__people {
    width: 380px;
  }

  .updated {
    font-size: 24px;
  }

  .reservation-edit__button {
    margin: 30px auto 0;
    display: flex;
    justify-content: space-around;
  }

  .reservation-update__button, .reservation-update-close__button {
    padding: 10px 20px;
    background: blue;
    border: none;
    border-radius: 4px;
    color: white;
  }
</style>