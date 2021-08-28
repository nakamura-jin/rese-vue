<template>
  <div class="owner-login">
    <div class="login-form">
      <div class="form-header__owner">
        <p>Login</p>
      </div>
      <div class="owner__data">
        <div class="mail">
          <fa icon="envelope" class="login__icon"/>
          <validation-provider v-slot="{ errors }" rules="required|email">
            <input type="email" name="email" v-model="OwnerEmail" placeholder="Email">
            <div class="error__login">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="password">
          <fa icon="lock" class="login__icon"/>
          <validation-provider v-slot="{ errors }" rules="required">
            <input type="password" name="password" v-model="OwnerPassword" placeholder="Password">
            <div class="error__login">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <button class="btn__login-owner" @click="ownerLogin">ログイン</button>
      </div>
    </div>
    <p>オーナー登録は<span @click="OwnerRegisterPage" class="transition__register">こちら</span></p>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'OwnerLogin',
  data() {
    return {
      OwnerEmail: '',
      OwnerPassword: '',
      checkHasShops: ''
    }
  },
  methods: {
    ownerLogin() {
      if(!this.OwnerEmail || !this.OwnerPassword) {
        alert('メールアドレスまたはパスワードに誤りがあります。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.OwnerEmail, this.OwnerPassword)
        .then(() =>{
          const sendOwner = {
            email: this.OwnerEmail
          };
          axios.post('https://rese-app.herokuapp.com/api/v1/owners/login', sendOwner)
          .then((response) => {
            const loginOwner = response.data.data
            axios.get('https://rese-app.herokuapp.com/api/v1/shops')
            .then((response) => {
              this.checkHasShops = response.data.data
              let selectPage =
              this.checkHasShops.some((select) => {
                if(select.owner_id == loginOwner.id){
                  return this.$router.push('/owner')
                } else {
                  return false
                }
              })
              if(selectPage == false) {
                return this.$router.push('/owner/shop/register')
              }
            })
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
    OwnerRegisterPage() {
      this.$router.push('/owner/register')
    }
  }
}
</script>


<style>
  .owner-login {
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

  .form-header__owner {
    height: 60px;
    border-radius: 8px 8px 0 0 ;
    background: skyblue;
  }

  .form-header__owner p {
    margin: 0;
    text-align: left;
    padding-left: 20px;
    font-size: 20px;
    line-height: 60px;
    font-weight: bold;
    color: white;
  }

  .owner__data {
    margin: 30px 20px;
  }
  .owner__data input {
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
  .btn__login-owner {
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

  .error__login {
    color: red;
  }



  /* sp版 */
  @media screen and (max-width:480px){
    .owner-login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
    }
    .form-header__owner {
      height: 40px;
      border-radius: 8px 8px 0 0 ;
      background: skyblue;
    }

    .form-header__owner p {
      margin: 0;
      text-align: left;
      padding-left: 20px;
      font-size: 20px;
      line-height: 40px;
      font-weight: bold;
      color: white;
    }
    .owner__data {
      margin: 20px 10px;
    }
    .owner__data input {
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
    .login__icon {
      font-size: 12px;
      color: gray;
    }
    .btn__login-owner {
      font-size: 12px;
    }
  }
</style>
