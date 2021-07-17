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
      <fa icon="times-circle" class="clock" style="Regular" @click="reservationDelete(reservation.id, index)"/>
    </div>
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
      noReservation: false
    }
  },
  methods: {
    getReservation(){
      firebase
    .auth()
    .onAuthStateChanged(user => {
      axios.get('http://127.0.0.1:8000/api/v1/users/' + user.uid + '/reservations')
      .then((response) => {
        this.reservations = response.data.data;
        if(this.reservations == 0) {
          this.noReservation = !this.noReservation
        }
      })
    })
    },

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
    }
  },
  created() {
    this.getReservation()
  }
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
  .clock {
    transform: scale(1.5);
  }
  table {
    text-align: left;
  }
  th, td {
    padding: 10px;
  }
</style>