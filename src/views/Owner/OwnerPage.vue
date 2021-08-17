<template>
  <div class="owner__page">
    <div class="owner__page-header">
      <h1 class="owner__shop-name">{{ ownerShop.shopname }}</h1>
      <button class="pc-mode__owner__shop-logout" @click="ownerLogout">ログアウト</button>
    </div>
    <div class="owner__container">
      <main>

        <!-- spのみ -->
        <div class="sp-mode__select-page__button">
          <div class="selected__today-reservations">
            <button class="sp-mode__owner-reservation-status" @click="ownerTodayReservations">予約状況</button>
            <p class="owner__selected-border" v-show="todayReservation"></p>
          </div>
          <div class="selected__shop-info">
            <button class="spmode__owner-shop-info" @click="ownerShopInfo">店舗概要</button>
            <p class="owner__selected-border" v-show="shopInfo"></p>
          </div>
        </div>
        <!-- ここまで -->

        <!-- pc版 -->
        <div class="pc-mode__reservation__today">
          <span>{{ getToday() }}</span>
          <h2>本日のご予約 {{ setTodayReservation.length }} 件です</h2>
          <div class="reservation__table">
            <table
                v-for="reservation in setTodayReservation" :key="reservation.id"
                :class="{ guest__visited: comingColor }"
                class="reservation__list"
                >
              <tr :disabled="isComing" v-if="reservation.date == getToday()">
                <th>来店時間</th>
                <th>予約者名</th>
                <th>人数</th>
                <th>来店状況</th>
                <th>キャンセル</th>
              </tr>
              <tr v-if="reservation.date == getToday()">
                <td>{{ reservation.time }}</td>
                <td>{{ reservation.user_name }} 様</td>
                <td>{{ reservation.people }}名</td>
                <td>
                  <button class="coming_reservation_chenge" @click="reservationEditShop(reservation)">予約変更</button>
                </td>
                <td>
                  <button class="coming_reservation_cansel" @click="cansel(reservation.id)">キャンセル</button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- sp版 -->
        <div class="sp-mode__reservation__today" v-show="todayReservation">
          <span>{{ getToday() }}</span>
          <h2>本日のご予約 {{ setTodayReservation.length }} 件です</h2>
          <div class="reservation__table">
            <table
                v-for="reservation in setTodayReservation" :key="reservation.id"
                :class="{ guest__visited: comingColor }"
                class="sp-mode__reservation__list"
                >
              <tr :disabled="isComing" v-if="reservation.date == getToday()">
                <th>来店時間</th>
                <th>予約者名</th>
                <th>人数</th>
                <th>来店状況</th>
                <th>キャンセル</th>
              </tr>
              <tr v-if="reservation.date == getToday()">
                <td>{{ reservation.time }}</td>
                <td>{{ reservation.user_name }} 様</td>
                <td>{{ reservation.people }}名</td>
                <td>
                  <button class="coming_reservation_chenge" @click="reservationEditShop(reservation)">予約変更</button>
                </td>
                <td>
                  <button class="coming_reservation_cansel" @click="cansel(reservation.id)">キャンセル</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </main>
      <aside class="pc-mode__shop_info">
        <p>店舗情報</p>
        <div class="owner__shopInformation">
          <img :src="ownerShop.image" class="owner__shop-image">
          <p>{{ ownerShop.overview }}</p>
          <p>エリア</p>
          <span>{{ ownerShop.area_name }}</span>
        </div>
      </aside>

      <aside class="sp-mode__shop_info" v-show="shopInfo">
        <p>店舗情報</p>
        <div class="owner__shopInformation">
          <img :src="ownerShop.image" class="owner__shop-image">
          <p>{{ ownerShop.overview }}</p>
          <p>エリア</p>
          <span>{{ ownerShop.area_name }}</span>
        </div>
      </aside>
    </div>
    <!-- モーダル -->
    <!-- pc版 -->
    <div class="pc-mode__reservation-edit-table" :class="{ reservationEditForShop__modal: reservationEditModal}">
      <div class="reservationEditForShop">
        <div class="reservationEditForShop__container">
          <div class="reservationEditForShop__card">
            <!-- 予約変更完了 -->
            <div :class="{ createdUpdateReservation: isUpdatedReservation }" class="ceated_update_reservation">
              <div class="ceated_update_reservation-inner">
                <p class="ceated_update_reservation-title">予約を変更しました</p>
                <button class="ceated_update_reservation-button" @click="reservationEditShopModalClose">戻る</button>
              </div>
            </div>
            <!-- ここまで予約変更完了 -->
            <div class="reservationEditForShop__inner" :class="{reservationUpdateShop: reservationBeforeData}">
              <p class="reservationEditForShop__title">予約情報</p>
              <table v-show="selectUser" class="reservationEditForShop__table">
                <tr>
                  <th>予約者名</th>
                  <td>{{ selectUser.user_name }} 様</td>
                </tr>
                <tr>
                  <th>予約日</th>
                  <td>
                    <div v-if="updateReservationDate == ''">
                      {{ selectUser.date }}
                    </div>
                    <div v-else class="update__reservation-data">
                      {{ updateReservationDate }}
                    </div>
                  </td>
                  <td><button @click="reservationEditDate" class="update_reservation_change_button">変更</button></td>
                  <td v-if="updateReservationDate != ''">
                    <button class="update_reservation_change_button" @click="reservationEditDateClear">元に戻す</button>
                  </td>
                </tr>
                <tr>
                  <th>予約時間</th>
                  <td>
                    <div v-if="updateReservationTime == ''">
                      {{ selectUser.time }}
                    </div>
                    <div v-else class="update__reservation-data">
                      {{ updateReservationTime }}
                    </div>
                  </td>
                  <td><button @click="reservationEditTime" class="update_reservation_change_button">変更</button></td>
                  <td v-if="updateReservationTime != ''">
                    <button class="update_reservation_change_button" @click="reservationEditTimeClear">元に戻す</button>
                  </td>
                </tr>
                <tr>
                  <th>人数</th>
                  <td>
                    <div v-if="updateReservationPeople == ''">
                      {{ selectUser.people }}名
                    </div>
                    <div v-else class="update__reservation-data">
                      {{ updateReservationPeople }}名
                    </div>
                  </td>
                  <td><button class="update_reservation_change_button" @click="reservationEditPeople">変更</button></td>
                  <td v-if="updateReservationPeople != ''">
                    <button class="update_reservation_change_button" @click="reservationEditPeopleClear">元に戻す</button>
                  </td>
                </tr>
              </table>
              <div class="reservationEditForShop__button">
                <button class="reservationEditForShop__confirm-button" @click="updateReservationShop(selectUser)">変更確定</button>
                <button class="reservationEditForShop__close-button" @click="reservationEditShopModalClose">戻る</button>
              </div>
            </div>

            <!-- 予約日変更 -->
            <div :class="{updateReservation__date: openDate}" class="update__shop-date">
              <div class="update__shop-date__inner">
                <p class="update__shop-date__title">予約変更日</p>
                <input type="date" class="update-shop-date__input"  v-model="updateReservationDate">
                <div class="update-shop-date__button">
                  <button class="update-shop-date__decision-button" @click="updatedReservationDate">確定</button>
                  <button class="update-shop-date__close-button" @click="updatedReservationDateClose">戻る</button>
                </div>
              </div>
            </div>

            <!-- 予約時間変更 -->
            <div :class="{updateReservation__time: openTime}" class="update__shop-time">
              <div class="update__shop-time__inner">
                <p class="update__shop-time__title">予約変更時間</p>
                <select class="update-shop-time__input" :class="{updateReservation__time: openTime}" v-model="updateReservationTime">
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
                <div class="update-shop-time__button">
                  <button class="update-shop-time__decision-button" @click="updatedReservationTime">確定</button>
                  <button class="update-shop-time__close-button" @click="updatedReservationTimeClose">戻る</button>
                </div>
              </div>
            </div>

            <!-- 予約人数変更 -->
            <div :class="{updateReservation__people: openPeople}" class="update__shop-people">
              <div class="update__shop-people__inner">
                <p class="update__shop-people__title">予約変更人数</p>
                  <select class="update-shop-people__input" :class="{updateReservation__people: openPeople}" v-model="updateReservationPeople">
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
                <div class="update-shop-people__button">
                  <button class="update-shop-people__decision-button" @click="updatedReservationPeople">確定</button>
                  <button class="update-shop-people__close-button" @click="updatedReservationPeopleClose">戻る</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- sp版 -->
    <div class="sp-mode__reservation-edit-table" :class="{ spmode__reservationEditForShop__modal: reservationEditModal}">
      <div class="reservationEditForShop">
        <div class="reservationEditForShop__container">
          <div class="reservationEditForShop__card">
            <!-- 予約変更完了 -->
            <div :class="{ createdUpdateReservation: isUpdatedReservation }" class="ceated_update_reservation">
              <div class="ceated_update_reservation-inner">
                <p class="ceated_update_reservation-title">予約を変更しました</p>
                <button class="ceated_update_reservation-button" @click="reservationEditShopModalClose">戻る</button>
              </div>
            </div>
            <!-- ここまで予約変更完了 -->
            <div class="reservationEditForShop__inner" :class="{reservationUpdateShop: reservationBeforeData}">
              <p class="reservationEditForShop__title">予約情報</p>
              <table v-show="selectUser" class="sp-mode__reservationEditForShop__table">
                <tr>
                  <th>予約者名</th>
                  <td>{{ selectUser.user_name }} 様</td>
                </tr>
                <tr>
                  <th>予約日</th>
                </tr>
                <tr>
                  <td>
                    <div v-if="updateReservationDate == ''">
                      {{ selectUser.date }}
                    </div>
                    <div v-else class="update__reservation-data">
                      {{ updateReservationDate }}
                    </div>
                  </td>
                  <td><button @click="reservationEditDate" class="update_reservation_change_button">変更</button></td>
                  <td v-if="updateReservationDate != ''">
                    <button class="update_reservation_change_button" @click="reservationEditDateClear">元に戻す</button>
                  </td>
                </tr>
                <tr>
                  <th>予約時間</th>
                </tr>
                <tr>
                  <td>
                    <div v-if="updateReservationTime == ''">
                      {{ selectUser.time }}
                    </div>
                    <div v-else class="update__reservation-data">
                      {{ updateReservationTime }}
                    </div>
                  </td>
                  <td><button @click="reservationEditTime" class="update_reservation_change_button">変更</button></td>
                  <td v-if="updateReservationTime != ''">
                    <button class="update_reservation_change_button" @click="reservationEditTimeClear">元に戻す</button>
                  </td>
                </tr>
                <tr>
                  <th>人数</th>
                </tr>
                <tr>
                  <td>
                    <div v-if="updateReservationPeople == ''">
                      {{ selectUser.people }}名
                    </div>
                    <div v-else class="update__reservation-data">
                      {{ updateReservationPeople }}名
                    </div>
                  </td>
                  <td><button class="update_reservation_change_button" @click="reservationEditPeople">変更</button></td>
                  <td v-if="updateReservationPeople != ''">
                    <button class="update_reservation_change_button" @click="reservationEditPeopleClear">元に戻す</button>
                  </td>
                </tr>
              </table>
              <div class="reservationEditForShop__button">
                <button class="reservationEditForShop__confirm-button" @click="updateReservationShop(selectUser)">変更確定</button>
                <button class="reservationEditForShop__close-button" @click="reservationEditShopModalClose">戻る</button>
              </div>
            </div>

            <!-- 予約日変更 -->
            <div :class="{updateReservation__date: openDate}" class="update__shop-date">
              <div class="update__shop-date__inner">
                <p class="update__shop-date__title">予約変更日</p>
                <input type="date" class="update-shop-date__input"  v-model="updateReservationDate">
                <div class="update-shop-date__button">
                  <button class="update-shop-date__decision-button" @click="updatedReservationDate">確定</button>
                  <button class="update-shop-date__close-button" @click="updatedReservationDateClose">戻る</button>
                </div>
              </div>
            </div>

            <!-- 予約時間変更 -->
            <div :class="{updateReservation__time: openTime}" class="update__shop-time">
              <div class="update__shop-time__inner">
                <p class="update__shop-time__title">予約変更時間</p>
                <select class="update-shop-time__input" :class="{updateReservation__time: openTime}" v-model="updateReservationTime">
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
                <div class="update-shop-time__button">
                  <button class="update-shop-time__decision-button" @click="updatedReservationTime">確定</button>
                  <button class="update-shop-time__close-button" @click="updatedReservationTimeClose">戻る</button>
                </div>
              </div>
            </div>

            <!-- 予約人数変更 -->
            <div :class="{updateReservation__people: openPeople}" class="update__shop-people">
              <div class="update__shop-people__inner">
                <p class="update__shop-people__title">予約変更人数</p>
                  <select class="update-shop-people__input" :class="{updateReservation__people: openPeople}" v-model="updateReservationPeople">
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
                <div class="update-shop-people__button">
                  <button class="update-shop-people__decision-button" @click="updatedReservationPeople">確定</button>
                  <button class="update-shop-people__close-button" @click="updatedReservationPeopleClose">戻る</button>
                </div>
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
  name: 'OwnerPage',
  data() {
    return {
      ownerShop: [],
      ownerShopImage: '',
      owner_id: '',
      makeURL: '',
      setToday: '',
      ReservationPeople: [],
      comingCheck: [],
      isComing: false,
      comingColor: false,
      setTodayReservation: [],
      setReservationUser: [],
      // モーダル
      reservationEditModal: false,
      selectUser: [],
      updateReservationDate: '',
      updateReservationTime: '',
      updateReservationPeople: '',
      reservationBeforeData: false,
      isUpdatedReservation: true,
      openDate: true,
      openTime: true,
      openPeople: true,

      beforeUpdateReservationDate: '',
      beforeUpdateReservationTime: '',
      beforeUpdateReservationPeople: '',


      // sp版
      todayReservation: true,
      shopInfo: false
    }
  },
  methods: {
    // 日付取得
    getToday() {
      let today = new Date()
      var month = ("0" + (today.getMonth()+1)).slice(-2)
      var day = ("0" + (today.getDate())).slice(-2)
      this.setToday = today.getFullYear() + '-' + month + '-' + day
      return this.setToday
    },

    getOwnerShop() {
      firebase
      .auth()
      .onAuthStateChanged(user => {
        this.owner_id = user.uid
        axios.get('http://127.0.0.1:8000/api/v1/owners/' + user.uid)
        .then((response) => {
          this.ownerShop = response.data.data
          this.getReservationPeople();
        })
      })
    },

    MyShop(image) {
      const ref = firebase.storage().ref('/rese/' + image);
      ref.getDownloadURL()
      .then((url) => {
        this.makeURL = url
      })
      return this.makeURL
    },

    ownerTodayReservations() {
      this.todayReservation = true,
      this.shopInfo = false
    },

    ownerShopInfo() {
      this.todayReservation = false,
      this.shopInfo = true
    },

    // 予約情報取得
    getReservationPeople() {
      axios.get('http://127.0.0.1:8000/api/v1/owners/' + this.ownerShop.shop_id + '/reservations')
      .then((response) => {
        this.ReservationPeople = response.data.data
        this.setTodayReservation = this.ReservationPeople.filter((rsv) => rsv.date == this.setToday)

        // 時間順に並び替え
        this.setTodayReservation.sort((a,b) => {
          if(a.time < b.time) {
            return -1
          } else {
            return 1
          }
        })
      })
    },

    showShopInfo() {
      this.todayReservation = false,
      this.shopInfo = true
    },

    // 予約変更 モーダル開く
    reservationEditShop(reservation) {
      this.reservationEditModal = false
      this.selectUser = reservation
    },

    // キャンセル
    cansel(canselId) {
      if(confirm('予約を取り消しますか？')) {
        alert('予約を取り消しました')
        axios.delete('http://127.0.0.1:8000/api/v1/shops/reservation/' + canselId)
        this.getOwnerShop();
        console.log(canselId)
      }
    },

    // 予約変更確定
    updateReservationShop(makeUpdateData) {
      const updateReservationData = {
        date: this.updateReservationDate,
        time: this.updateReservationTime,
        people: this.updateReservationPeople
      }
      if(this.updateReservationDate == '') {
        updateReservationData.date = makeUpdateData.date
      }
      if(this.updateReservationTime == '') {
        updateReservationData.time = makeUpdateData.time
      }
      if(this.updateReservationPeople == '') {
        updateReservationData.people = makeUpdateData.people
      }
      axios.put('http://127.0.0.1:8000/api/v1/shops/reservation/' + makeUpdateData.id , updateReservationData)
      this.isUpdatedReservation = false
      this.reservationBeforeData = true
      this.getOwnerShop();
    },

    // モーダル閉じる
    reservationEditShopModalClose() {
      this.reservationEditModal = true,
      this.reservationBeforeData = false,
      this.isUpdatedReservation = true,
      this.updateReservationDate = '',
      this.updateReservationTime = '',
      this.updateReservationPeople = ''
    },

    // 予約日変更
    reservationEditDate() {
      this.openDate = false
      this.reservationBeforeData = true
      this.beforeUpdateReservationDate = this.updateReservationDate
    },

    // 予約日変更確定
    updatedReservationDate() {
      this.openDate = true
      this.reservationBeforeData = false
    },

    updatedReservationDateClose() {
      this.openDate = true
      this.reservationBeforeData = false
      if(this.updateReservationDate != this.beforeUpdateReservationDate) {
        this.updateReservationDate = this.beforeUpdateReservationDate
      }
    },

    reservationEditDateClear() {
      this.updateReservationDate = ''
    },
    // ここまで予約日変更


    // 予約時間変更
    reservationEditTime() {
      this.openTime = false
      this.reservationBeforeData = true
      this.beforeUpdateReservationTime = this.updateReservationTime
    },

    updatedReservationTime() {
      this.openTime = true
      this.reservationBeforeData = false
    },

    updatedReservationTimeClose() {
      this.openTime = true
      this.reservationBeforeData = false
      if(this.updateReservationTime != this.beforeUpdateReservationTime) {
        this.updateReservationTime = this.beforeUpdateReservationTime
      }
    },

    reservationEditTimeClear() {
      this.updateReservationTime = ''
    },
    // ここまで予約時間変更


    // 予約人数変更
    reservationEditPeople() {
      this.openPeople = false
      this.reservationBeforeData = true
      this.beforeUpdateReservationPeople = this.updateReservationPeople
    },

    updatedReservationPeople() {
      this.openPeople = true
      this.reservationBeforeData = false
    },

    updatedReservationPeopleClose() {
      this.openPeople = true
      this.reservationBeforeData = false
      if(this.updateReservationPeople != this.beforeUpdateReservationPeople) {
        this.updateReservationPeople = this.beforeUpdateReservationPeople
      }
    },

    reservationEditPeopleClear() {
      this.updateReservationPeople = ''
    },
    // ここまで予約人数変更


    // ログアウト
    ownerLogout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/owner/login')
      })
    }
  },
  created() {
    this.getOwnerShop();
  }
}
</script>

<style>
  .owner__page-header {
    display: flex;
    justify-content: center;
    margin: 21px 0;
  }
  .owner__shop-name {
    margin: 0;
  }
  .pc-mode__owner__shop-logout {
    display: block;
    position: absolute;
    height: 50px;
    right: 500px;
    padding: 10px 20px;
    background: blue;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  .owner__container {
    display: flex;
    justify-content: space-between;
  }
  main {
    width: 78%;
  }
  .sp-mode__reservation__today,
  .sp-mode__shop_info {
    display: none;
  }
  .sp-mode__select-page__button {
    display: none;
  }
  .pc-mode__reservation__today h2 {
    text-align: left;
    margin: 0;
  }
  .pc-mode__reservation__today span {
    display: flex;
    font-size: 20px;
  }
  aside {
    width: 20%;
    border: 1px solid black;
  }
  .owner__shopInformation {
    padding: 4px;
  }
  .owner__shop-image {
    width: 100%;
  }
  .reservation__table {
    margin-top: 20px;
  }
  .reservation__list {
    width: 100%;
    margin-bottom: 30px;
  }
  .reservation__table th,
  .reservation__table td {
    border: 1px solid black;
    text-align: center;
    width: 20%;
  }
  .reservation__table th {
    background: blue;
    color: white;
  }

  .coming_reservation_chenge,
  .coming_reservation_cansel {
    padding: 6px 50px;
    border-radius: 4px;
    /* font-weight: bold; */
    cursor: pointer;
  }
  .reservation__time {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 5px;
    border-bottom: 4px solid blue;
    cursor: pointer;
  }
  .guest__visited {
    color: #ccc;
  }

  /* モーダル */
  .pc-mode__reservation-edit-table {
    display: block;
  }
  .sp-mode__reservation-edit-table {
    display: none;
  }
  .reservationEditForShop {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }
  .reservationEditForShop__modal {
    display: none;
  }
  .reservationEditForShop__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .reservationEditForShop__card {
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
  }
  .reservationEditForShop__inner {
    padding: 20px;
  }
  .reservationEditForShop__title {
    font-size: 20px;
    font-weight: bold;
  }
  .reservationEditForShop__table {
    margin: 0 auto;
  }
  .reservationEditForShop__button {
    margin: 30px auto 0;
    display: flex;
    justify-content: space-around;
  }
  .reservationEditForShop__confirm-button, .reservationEditForShop__close-button,
  .update-shop-date__decision-button, .update-shop-date__close-button,
  .update-shop-time__decision-button, .update-shop-time__close-button,
  .update-shop-people__decision-button, .update-shop-people__close-button,
  .ceated_update_reservation-button {
    padding: 10px 20px;
    background: blue;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
  .reservationUpdateShop {
    display: none;
  }

  .createdUpdateReservation {
    display: none;
  }


  /* 予約変更 */
  .updateReservation__date,
  .updateReservation__time,
  .updateReservation__people {
    display: none;
  }
  .update__shop-date,
  .update__shop-time,
  .update__shop-people {
    height: 300px;
  }
  .update__shop-date__inner,
  .update__shop-time__inner,
  .update__shop-people__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .update__shop-date__title,
  .update__shop-time__title,
  .update__shop-people__title {
    font-weight: bold;
  }
  .update-shop-date__input,
  .update-shop-time__input,
  .update-shop-people__input {
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
  .update-shop-date__button,
  .update-shop-time__button,
  .update-shop-people__button {
    width: 50%;
    margin: 150px auto 0;
    display: flex;
    justify-content: space-around;
  }
  .update__reservation-data {
    font-size: 20px;
    font-weight: bold;
  }
  .update_reservation_change_button {
    padding: 6px 10px;
    background: yellow;
    border-radius: 4px;
    cursor: pointer;
  }


  .ceated_update_reservation {
    height: 330px;
  }
  .ceated_update_reservation-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .ceated_update_reservation-title {
    font-size: 24px;
    margin-bottom: 160px;
  }






/* sp版 */
  @media screen and (max-width:480px){
    .pc-mode__reservation__today,
    .pc-mode__shop_info {
      display: none;
    }
    .sp-mode__reservation__today,
    .sp-mode__shop_info {
      display: block;
    }
    .owner__page {
      width: 90%;
      margin: 60px auto;
    }
    main, aside {
      width: 100%;
    }
    .owner__page-header {
      width: 100%;
    }
    .owner__shop-name {
      width: 100%;
      font-size: 24px;
    }
    .pc-mode__owner__shop-logout {
      display: none;
    }
    .owner__container {
      display: block;
    }
    .sp-mode__select-page__button {
      display: flex;
    }
    .sp-mode__reservation__today h2 {
      font-size: 20px;
      margin: 0;
      text-align: left;
    }
    .sp-mode__reservation__today span {
      display: flex;
      font-size: 16px;
    }
    .selected__today-reservations,
    .selected__shop-info {
      width: 50%;
      margin-bottom: 30px;
    }
    .sp-mode__owner-reservation-status,
    .spmode__owner-shop-info {
      width: 100%;
      padding: 10px 0 20px 0;
      border: none;
      font-size: 16px;
      font-weight: bold;
    }
    .owner__selected-border {
      height: 4px;
      width: 100%;
      margin: 0;
      background: blue;
    }
    .reservation__table th,
    .reservation__table td {
      padding: 6px;
    }

    .reservation__table th:nth-of-type(1),
    .reservation__table td:nth-of-type(1) {
      width: 10%;
    }
    .reservation__table th:nth-of-type(2),
    .reservation__table td:nth-of-type(2) {
      width: 16%;
    }
    .reservation__table th:nth-of-type(3),
    .reservation__table td:nth-of-type(3) {
      width: 10%;
    }
    .reservation__table th:nth-of-type(4),
    .reservation__table td:nth-of-type(4) {
      width: 18%;
    }
    .sp-mode__reservation__list {
      font-size: 8px;
      margin-bottom: 20px;
    }
    .coming_reservation_chenge,
    .coming_reservation_cansel {
      padding: 4px;
      font-size: 8px;
      width: 90%
    }



    /* sp版 モーダル */
    .reservationEditForShop__card {
      width: 90%;
    }
    .pc-mode__reservation-edit-table {
      display: none;
    }
    .sp-mode__reservation-edit-table {
      display: block;
    }
    .sp-mode__reservationEditForShop__table {
      width: 100%;
    }
    .spmode__reservationEditForShop__modal {
      display: none;
    }


    .update__reservation-data,
    .update__reservation-time,
    .update__reservation-people {
      font-size: 16px;
    }
    .update_reservation_change_button {
      padding: 4px 6px;
      background: yellow;
      border-radius: 4px;
      cursor: pointer;
    }
    .sp-mode__reservationEditForShop__table,
    .sp-mode__reservationEditForShop__table th,
    .sp-mode__reservationEditForShop__table td{
      padding: 4px;
    }
  }
</style>