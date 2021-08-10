<template>
  <div class="login">
    <div class="login-form">
      <div class="form-header">
        <p>Login</p>
      </div>
      <div class="user_data">
        <div class="mail">
          <fa icon="envelope" class="login__icon"/>
          <validation-provider v-slot="{ errors }" rules="required|email">
            <input type="email" name="email" v-model="Email" placeholder="Email">
            <div class="error__login">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="password">
          <fa icon="lock" class="login__icon"/>
          <validation-provider v-slot="{ errors }" rules="required">
            <input type="password" name="password" v-model="Password" placeholder="Password">
            <div class="error__login">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <button class="btn__login" @click="login">ログイン</button>
      </div>
    </div>
    <p>会員登録は<span @click="registerPage" class="transition__register">こちら</span></p>
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
      select: 'user',
      userColor: true,
      shopColor:false,
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
    registerPage(){
      this.$router.push('/register')
    }
  }
}
</script>


<style>
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28%;
  }

  .login-form {
    width: 100%;
    background: white;
    border: 1px solid white;
    border-radius: 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }

  .form-header {
    height: 60px;
    border-radius: 8px 8px 0 0 ;
    background: blue;
  }

  .form-header p {
    margin: 0;
    text-align: left;
    padding-left: 20px;
    font-size: 20px;
    line-height: 60px;
    font-weight: bold;
    color: white;
  }

  .user_data {
    margin: 30px 20px;
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
    display: block;
    margin-left: auto;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  .transition__register {
    color: blue;
    cursor: pointer;
  }

  .error__login {
    color: red;
  }
</style>
