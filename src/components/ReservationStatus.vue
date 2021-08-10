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
    <div class="user-reservation__modal" :class="{ userReservatinModal: isEdit }">
      <div class="user-reservation__container">
        <div class="user-reservation__card">
          <div class="user-reservation__inner">
            <div class="user-resevation__data" v-show="isTable">
              <p class="user-reservation__title">予約情報</p>
              <table class="user-reservation__table">
                <tr>
                  <th>店舗名</th>
                  <td>{{ reservationShop.shopname }}</td>
                </tr>
                <tr>
                  <th>予約日</th>
                  <td v-if="userReservationEditDate == ''">
                    {{ reservationShop.date }}
                  </td>
                  <td v-else class="edit__reservation__data">
                    {{ userReservationEditDate }}
                  </td>
                  <td>
                    <button class="edit__reservation__button" @click="editReservationDate()">変更</button>
                  </td>
                  <td v-if="userReservationEditDate != ''">
                    <button class="edit__reservation__button" @click="editReservationDateClear()">元に戻す</button>
                  </td>
                </tr>

                <tr>
                  <th>予約時間</th>
                  <td v-if="userReservationEditTime == ''">
                    {{ reservationShop.time }}
                  </td>
                  <td v-else class="edit__reservation__time">
                    {{ userReservationEditTime }}
                  </td>
                  <td>
                    <button class="edit__reservation__button" @click="editReservationTime()">変更</button>
                  </td>
                  <td v-if="userReservationEditTime != ''">
                    <button class="edit__reservation__button" @click="editReservationTimeClear()">元に戻す</button>
                  </td>
                </tr>

                <tr>
                  <th>予約人数</th>
                  <td v-if="userReservationEditPeople == ''">
                    {{ reservationShop.people }} 名
                  </td>
                  <td v-else class="edit__reservation__people">
                    {{ userReservationEditPeople }} 名
                  </td>
                  <td>
                    <button class="edit__reservation__button" @click="editReservationPeople()">変更</button>
                  </td>
                  <td v-if="userReservationEditPeople != ''">
                    <button class="edit__reservation__button" @click="editReservationPeopleClear()">元に戻す</button>
                  </td>
                </tr>
              </table>
              <div class="user-reservation__button">
                <button class="user-reservation__chenge-button" @click="userReservationDataUpdate(reservationShop)">変更登録</button>
                <button class="user-reservation__close-button" @click="userReservatinModalClose()">閉じる</button>
              </div>
            </div>

            <!-- 予約日変更入力 -->
            <div class="user-reservation__edit" v-show="isDate">
              <div class="user-reservation__edit__inner">
                <p>予約日変更</p>
                <input type="date" class="user-reservation__input-date" v-model="userReservationEditDate">
                <div class="user-reservation__input__button">
                  <button class="user-reservation__input__chenge-button" @click="chengeDate()">変更</button>
                  <button class="user-reservation__input__close-button" @click="isDateClose()">閉じる</button>
                </div>
              </div>
            </div>

            <!-- 予約時間変更入力 -->
            <div class="user-reservation__edit" v-show="isTime">
              <div class="user-reservation__edit__inner">
                <p>予約時間変更</p>
                <select class="user-reservation__input-time" v-model="userReservationEditTime">
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
                <div class="user-reservation__input__button">
                  <button class="user-reservation__input__chenge-button" @click="chengeTime()">変更</button>
                  <button class="user-reservation__input__close-button" @click="isTimeClose()">閉じる</button>
                </div>
              </div>
            </div>

            <!-- 予約人数変更入力 -->
            <div class="user-reservation__edit" v-show="isPeople">
              <div class="user-reservation__edit__inner">
                <p>予約人数変更</p>
                <select class="user-reservation__input-people" v-model="userReservationEditPeople">
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
                <div class="user-reservation__input__button">
                  <button class="user-reservation__input__chenge-button" @click="chengePeople()">変更</button>
                  <button class="user-reservation__input__close-button" @click="isPeopleClose()">閉じる</button>
                </div>
              </div>
            </div>

            <!-- 予約変更完了 -->
            <div class="user-reservation__edit" v-show="isReservationUpdate">
              <div class="user-reservation__edit__inner">
                <p class="user-reservation__edit__text">予約を変更しました</p>
                <button class="user-reservation__input__close-button" @click="userReservatinModalClose()">閉じる</button>
              </div>
            </div>
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
      reservationShop: [],
      isEdit: true,
      isTable: false,
      isDate: false,
      isTime: false,
      isPeople: false,
      isReservationUpdate: false,

      userReservationEditDate: '',
      userReservationEditTime: '',
      userReservationEditPeople: '',

      keepUserReservationEditDate: '',
      keepUserReservationEditTime: '',
      keepUserReservationEditPeople: '',
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
      this.isEdit = false;
      this.isTable = true;
      axios.get('http://127.0.0.1:8000/api/v1/shops/reservation/' + id)
      .then((response) => {
        this.reservationShop = response.data.data
      })
    },


    // 予約日変更 テーブル
    editReservationDate() {
      this.isTable = false;
      this.isDate = true;
    },
    editReservationDateClear() {
      this.userReservationEditDate = '';
      this.keepUserReservationEditDate = '';
    },

    // 予約日変更 変更画面
    chengeDate() {
      this.isTable = true;
      this.isDate = false;
      this.keepUserReservationEditDate = this.userReservationEditDate
    },
    isDateClose() {
      this.isTable = true;
      this.isDate = false;
      if(this.keepUserReservationEditDate != this.userReservationEditDate || this.userReservationEditDate == '') {
        this.userReservationEditDate = this.keepUserReservationEditDate
      }
    },

    // 予約時間変更 テーブル
    editReservationTime() {
      this.isTable = false;
      this.isTime = true;
    },
    editReservationTimeClear() {
      this.userReservationEditTime = '';
      this.keepUserReservationEditTime = '';
    },

    // 予約時間変更 変更画面
    chengeTime() {
      this.isTable = true;
      this.isTime = false;
      this.keepUserReservationEditTime = this.userReservationEditTime
    },
    isTimeClose() {
      this.isTable = true;
      this.isTime = false;
      if(this.keepUserReservationEditTime != this.userReservationEditTime || this.userReservationEditTime == '') {
        this.userReservationEditTime = this.keepUserReservationEditTime
      }
    },

    // 予約人数変更 テーブル
    editReservationPeople() {
      this.isTable = false;
      this.isPeople = true;
    },
    editReservationPeopleClear() {
      this.userReservationEditPeople = ''
      this.keepUserReservationEditPeople = '';
    },

    // 予約人数変更 変更画面
    chengePeople() {
      this.isTable = true;
      this.isPeople = false;
      this.keepUserReservationEditPeople = this.userReservationEditPeople
    },
    isPeopleClose() {
      this.isTable = true;
      this.isPeople = false;
      if(this.keepUserReservationEditPeople != this.userReservationEditPeople || this.userReservationEditPeople == '') {
        this.userReservationEditPeople = this.keepUserReservationEditPeople
      }
    },



    // 予約変更登録
    userReservationDataUpdate(getReservationUser) {
      const setReservationUpdateData = {
        date: this.userReservationEditDate,
        time: this.userReservationEditTime,
        people: this.userReservationEditPeople
      };
      if(this.userReservationEditDate == '') {
        setReservationUpdateData.date = getReservationUser.date
      }
      if(this.userReservationEditTime == '') {
        setReservationUpdateData.time = getReservationUser.time
      }
      if(this.userReservationEditPeople == '') {
        setReservationUpdateData.people = getReservationUser.people
      }
      axios.put('http://127.0.0.1:8000/api/v1/shops/reservation/' + getReservationUser.id , setReservationUpdateData)
      console.log(getReservationUser.id)
      this.isTable = false;
      this.isReservationUpdate = true;
    },


    // モーダル閉じる
    userReservatinModalClose() {
      this.isEdit = true;
      this.isReservationUpdate = false
      this.userReservationEditDate = '';
      this.userReservationEditTime = '';
      this.userReservationEditPeople = '';

      this.keepUserReservationEditDate = '';
      this.keepUserReservationEditTime = '';
      this.keepUserReservationEditPeople = '';
      this.getReservation()
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
    /* height: 240px; */
    margin-bottom: 30px;
    font-weight: bold;
    border-radius: 10px;
    padding: 30px;
    background: blue;
    color: white;
    cursor: pointer;
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
    cursor: pointer;
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
  .userReservatinModal {
    display: none;
  }
  .user-reservation__container {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }
  .user-reservation__card {
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
  }
  .user-reservation__table {
    width: 80%;
    margin: 0 auto;
  }
  .edit__reservation__data {
    font-weight: bold;
  }
  .user-reservation__table th,
  .user-reservation__table td {
    width: 20%;
  }
  .user-reservation__button {
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
  }
  .edit__reservation__button {
    padding: 6px 10px;
    background: yellow;
    border-radius: 4px;
    cursor: pointer;
  }
  .user-reservation__chenge-button,
  .user-reservation__close-button,
  .user-reservation__input__chenge-button,
  .user-reservation__input__close-button {
    padding: 10px 20px;
    background: blue;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }

  /* 予約入力 */
  .user-reservation__edit {
    height: 330px;
  }
  .user-reservation__edit__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
  }
  .user-reservation__input-date,
  .user-reservation__input-time,
  .user-reservation__input-people {
    border: none;
    margin: 60px 0 100px;
    font-size: 20px;
  }
  .user-reservation__input__button {
    display: flex;
    justify-content: space-around;
  }
  .user-reservation__input__text {
    font-size: 20px;
    margin-bottom: 100px;
  }

</style>