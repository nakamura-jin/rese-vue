<template>
  <div class="register__owner">
    <div class="register-form">
      <div class="box-title__owner">
        <p>Register</p>
      </div>
      <div class="new-owner">
      <!-- 名前登録 バリデーション -->
        <div class="name">
          <fa icon="user" class="register__icon"/>
          <validation-provider v-slot="{ errors }" rules="required">
            <input type="text" name="name" v-model="OwnerName" placeholder="OwnerName" />
            <div class="error__register">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <!-- メールアドレス登録 バリデーション -->
        <div class="mail">
          <fa icon="envelope" class="register__icon"/>
          <validation-provider v-slot="{ errors }" rules="required|email">
            <input type="email" name="email" v-model="OwnerEmail" placeholder="Email" />
            <div class="error__register">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <!-- パスワード登録 バリデーション -->
        <div class="password">
          <fa icon="lock" class="register__icon"/>
          <validation-provider v-slot="{ errors }" rules="required">
            <input type="password" name="password" v-model="OwnerPassword" placeholder="Password" />
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>

        <button class="btn__register-owner" @click="ownerRegister">登録</button>
      </div>
    </div>
    <p>登録がお済みの場合は<span @click="OwnerLoginPage" class="transition__login">ログイン</span>へ</p>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'OwnerRegister',
  data() {
    return {
      OwnerName: null,
      OwnerEmail: null,
      OwnerPassword: null,
      uid: ''
    }
  },
  methods: {
    ownerRegister() {
      if (!this.OwnerName || !this.OwnerEmail || !this.OwnerPassword) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.OwnerEmail, this.OwnerPassword)
        .then((response) => {
          const sendOwnerData = {
            id: response.user.uid,
            name: this.OwnerName,
            email: this.OwnerEmail,
            password: this.OwnerPassword
          }
          axios.post('http://127.0.0.1:8000/api/v1/owners/register', sendOwnerData);
          console.log(sendOwnerData)
          this.$router.push("/owner/thanks")
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
    OwnerLoginPage() {
      this.$router.push('/owner/login')
    }
  }
}
</script>


<style>
  .register__owner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
  }

  .register-form {
    width: 100%;
    background: white;
    border: 1px solid white;
    border-radius: 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }

  .box-title__owner {
    height: 60px;
    border-radius: 8px 8px 0 0 ;
    background: skyblue;
  }
  .box-title__owner p {
    margin: 0;
    text-align: left;
    padding-left: 20px;
    font-size: 20px;
    line-height: 60px;
    font-weight: bold;
    color: white;
  }
  .new-owner {
    margin: 30px 20px;
  }
  .new-owner input {
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
  .btn__register-owner {
    display: block;
    margin-left: auto;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    background: skyblue;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  /* バリデーション */
  .error__register {
    color: red;
    box-sizing: border-box;
  }


  @media screen and (max-width:480px){

    .register__owner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
    }
    .register-form {
      width: 100%;
    }
    .box-title__owner {
      height: 40px;
      border-radius: 8px 8px 0 0 ;
      background: skyblue;
    }
    .box-title__owner p {
      margin: 0;
      text-align: left;
      padding-left: 20px;
      font-size: 20px;
      line-height: 40px;
      font-weight: bold;
      color: white;
    }
    .new-owner {
      margin: 20px 10px;
    }
    .new-owner input {
      width: 80%;
      margin-left: 20px;
      font-size: 16px;
      outline: none;
      border-top: none;
      border-right: none;
      border-bottom: 1px solid gray;
      border-left: none;
    }
    input::placeholder {
      font-size: 14px;
    }
    .register__icon {
      font-size: 12px;
      color: gray;
    }
  }
</style>



