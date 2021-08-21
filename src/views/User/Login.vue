<template>
    <div class="login">
      <div class="login-form" v-show="loginCard">
        <div class="form-header">
          <p>Login</p>
        </div>
        <div class="user_data">
          <div class="mail">
            <fa icon="envelope" class="login__icon"/>
            <validation-provider v-slot="{ errors }" rules="required|email" ref="email">
              <input type="email" name="email" v-model="Email" placeholder="Email">
              <div class="error__login">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="password">
            <fa icon="lock" class="login__icon"/>
            <validation-provider v-slot="{ errors }" rules="required" ref="password">
              <input type="password" name="password" v-model="Password" placeholder="Password">
              <div class="error__login">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <button class="btn__login" @click="login">ログイン</button>
        </div>
      </div>
      <p v-show="loginCard">会員登録は<span @click="registerPage" class="transition__register">こちら</span></p>

      <div class="check__verification-email" v-show="emailVerified">
        <div class="check__verification-email_container">
          <span class="emailVerified__text">検証メールが確認されていないため、<br>ログインできません。<br><br>
          メールをご確認後、<br>再度ログインを試してください。
          </span>
          <button class="go-to__login" @click="backLogin">戻る</button>
          <p class="go-to__login_text">メールを再送希望の場合は<span class="send_login_mail" @click="loginForEmail">こちら</span></p>
        </div>
      </div>

      <div class="send_mail" v-show="sendMail">
        <div class="send_mail_container">
          <p class="send_mail_text">メールを送信しました</p>
          <button class="go-to__login" @click="backLogin">戻る</button>
        </div>
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
      loginCard: true,
      emailVerified: false,
      sendMail: false
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
          if(user.user.emailVerified == false) {
            this.loginCard = false;
            this.emailVerified = true;
          } else {
            const sendUser = {
            email: this.Email
            }
            axios.post('http://127.0.0.1:8000/api/v1/users/login', sendUser)
            .then(() => {
              this.$router.push('/');
            })
          }
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
    },
    backLogin(){
      this.loginCard = true;
      this.emailVerified = false;
      this.sendMail = false;
      this.Email = '',
      this.Password = '',
      this.$refs.email.reset();
      this.$refs.password.reset();
    },
    loginForEmail() {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.Email, this.Password)
      .then(() =>{
        firebase.auth().currentUser.sendEmailVerification()
        this.emailVerified = false,
        this.sendMail = true
      })
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
    height: 30%;
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

  .transition__register,
  .send_login_mail {
    color: blue;
    cursor: pointer;
  }

  .error__login {
    color: red;
  }

  .emailVerified__text {
    font-size: 18px;
    font-weight: bold;
  }
  .go-to__login {
    margin-top: 40px;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: blue;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
  .check__verification-email_container,
  .send_mail_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: white;
    border-radius: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }
  .send_mail_container {
    width: 400px;
    height: 200;
  }
  .check__verification-email_container {
    width: 100%;
  }
  .send_mail_text {
    font-size: 24px;
  }



  /* sp版 */
  @media screen and (max-width:480px){

    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 40%;
    }
    .login__icon {
      font-size: 12px;
      color: gray;
    }
    .user_data input {
      width: 80%;
      margin-left: 20px;
      font-size: 16px;
      outline: none;
      border-top: none;
      border-right: none;
      border-bottom: 1px solid gray;
      border-left: none;
    }
    .form-header {
      height: 40px;
      border-radius: 8px 8px 0 0 ;
      background: blue;
    }

    .form-header p {
      margin: 0;
      text-align: left;
      padding-left: 20px;
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
      color: white;
    }
    .user_data {
      margin: 20px 10px;
    }
    input::placeholder {
      font-size: 12px;
    }
    .btn__login {
      font-size: 12px;
    }
  }
</style>
