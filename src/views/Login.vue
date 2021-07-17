<template>
  <div class="login-form">
    <div class="box-title">
      <p>Login</p>
    </div>
    <div class="user_data">
      <div class="mail">
        <fa icon="envelope" class="login__icon"/>
        <input type="email" name="email" v-model="Email" placeholder="Email">
      </div>
      <div class="password">
        <fa icon="lock" class="login__icon"/>
        <input type="password" name="password" v-model="Password" placeholder="Password">
      </div>
      <button class="btn__login" @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      Email: '',
      Password: '',
      resUser: [],
    }
  },
  methods: {
    login() {
      if(!this.Email || !this.Password) {
        alert('メールアドレスまたはパスワードに誤りがあります。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.Email, this.Password)
        .then(() =>{
          const sendUser = {
            email: this.Email
          };
          axios.post('http://127.0.0.1:8000/api/v1/users/login', sendUser)
          .then(() => {
            this.$router.push('/');
          })
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
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 220px;
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
  .user_data {
    margin: 20px;
  }
  .user_data input {
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
  .login__icon {
    transform: scale(1.5);
    color: gray;
  }
  .mail, .password {
    margin-bottom: 20px;
  }
  .btn__login {
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
