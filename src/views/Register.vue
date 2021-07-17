<template>
  <div class="register-form">
    <div class="box-title">
      <p>Register</p>
    </div>
    <div action="" class="new-user">
      <div class="name">
        <fa icon="user" class="register__icon"/>
        <input type="text" name="name" v-model="Name" placeholder="Username" />
      </div>
      <div class="mail">
        <fa icon="envelope" class="register__icon"/>
        <input type="email" name="email" v-model="Email" placeholder="Email" />
      </div>
      <div class="password">
        <fa icon="lock" class="register__icon"/>
        <input type="password" name="password" v-model="Password" placeholder="Password" />
      </div>
      <button class="btn__register" @click="register">登録</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      Name: null,
      Email: null,
      Password: null,
      uid: ''
    }
  },
  methods: {
    async register() {
      if (!this.Name || !this.Email || !this.Password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.Email, this.Password)
        .then((response) => {
          const sendData = {
            id: response.user.uid,
            name: this.Name,
            email: this.Email,
            password: this.Password
          }
          axios.post('http://127.0.0.1:8000/api/v1/users/register', sendData);
          this.$router.push("/thanks");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/user-disabled":
              alert("ユーザーが無効になっています。");
              break;
            case "auth/user-not-found":
              alert("ユーザーが存在しません。");
              break;
            case "auth/wrong-password":
              alert("パスワードが間違っております。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
  }
}
</script>


<style>
  .register-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 260px;
    background: white;
    border: 1px solid white;
    border-radius: 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }

  .box-title {
    height: 60px;
    border-radius: 8px 8px 0 0 ;
    background: blue;
  }
  .box-title p {
    margin: 0;
    text-align: left;
    padding-left: 20px;
    font-size: 20px;
    line-height: 60px;
    font-weight: bold;
    color: white;
  }
  .new-user {
    margin: 20px;
  }
  .new-user input {
    width: 300px;
    margin-left: 20px;
    font-size: 16px;
    outline: none;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid gray;
    border-left: none;
  }
  input::placeholder {
    font-size: 16px;
  }
  .register__icon {
    transform: scale(1.5);
    color: gray;
  }
  .name, .mail, .password {
    margin-bottom: 20px;
  }
  .btn__register {
    position: absolute;
    right: 10px;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
  }
</style>



