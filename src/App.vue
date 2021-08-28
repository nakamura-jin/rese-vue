<template>
  <div id="app">
    <div id="logo">
      <div class="click__home" @click="SiteHome">
        <fa icon="poll-h" class="icon size"/>
        <h1>Rese</h1>
      </div>
      <div class="menu" @click="menu" >
        <span :class="{ menuModal: isToggle }"></span>
        <span :class="{ menuModal: isToggle }"></span>
        <span :class="{ menuModal: isToggle }"></span>
      </div>

      <!-- メニューモーダル -->
      <div class="menu-modal" :class="{ toggleMemuModal: isClose }">
        <div class="menu-modal__container" :class="{ toggleMemuModal: isClose }">
          <div class="menu-modal__inner">
            <ul class="choice__link">
              <button class="link__mypage" @click="mypage">
                <fa icon="user" class="size sp__icon"/>
                <li class="link__title">マイページ</li>
              </button>
              <button class="link__login" v-if="this.getLoginUser == ''">
                <fa icon="sign-in-alt" class="size sp__icon"/>
                <li class="link__title">ログイン</li>
              </button>
              <button class="link__top" v-if="this.getLoginUser != ''" @click="top">
                <fa icon="sign-in-alt" class="size sp__icon"/>
                <li class="link__title">トップページ</li>
              </button>
              <button class="link__logout" @click="menubarLogout">
                <fa icon="sign-out-alt" class="size sp__icon"/>
                <li class="link__title">ログアウト</li>
              </button>
            </ul>
          </div>
        </div>
      </div>
      <!-- ここまで -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      isToggle: false,
      isClose: true,

      getLoginUser: ''
    }
  },
  methods: {
    logUser() {
      firebase
      .auth()
      .onAuthStateChanged(user => {
        this.getLoginUser = user.uid;
      })
    },
    SiteHome() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/')
      })
    },
    menu() {
      this.isToggle = !this.isToggle
      this.isClose = !this.isClose
    },
    mypage() {
      this.isToggle = !this.isToggle
      this.isClose = !this.isClose
      this.$router.push('/mypage')
    },
    top() {
      this.isToggle = !this.isToggle
      this.isClose = !this.isClose
      this.$router.push('/')
    },
    menubarLogout() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.isToggle = !this.isToggle
        this.isClose = !this.isClose
        this.$router.push('/')
      })
    }
  },
  created() {
    this.logUser();
  }
}
</script>

<style>
body {
  background: #eee;
  margin: 0 60px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.click__home {
  display: flex;
  justify-content: space-between;
}
#logo {
  display: flex;
  margin-top: 30px;
  color: blue;
  cursor: pointer;
  width: 100%;
}

#logo h1 {
  margin: 0 0 0 10px;
}

.icon {
  box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
}

.size {
  font-size: 40px;
}

.toggleMemuModal {
  display: none;
}




/* sp版 */
@media screen and (max-width:480px) {
  body {
    background: #eee;
    margin: 0;
  }
  .click__home {
    margin-left: 10px;
    line-height: 40px;
  }
  .menu {
    width: 30px;
    margin-right: 10px;
    height: 30px;
    position: relative;
    z-index: 5;
    transition: .4s;
  }
  .menu span {
    width: 80%;
    /* height: 24px; */
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .4s;
  }
  .menu span:nth-of-type(1) {
    top: 8px;
    height: 4px;
    border-radius: 4px;
    transition: .4s;
  }
  .menu span:nth-of-type(2) {
    top: 16px;
    height: 4px;
    border-radius: 4px;
    transition: .4s;
  }
  .menu span:nth-of-type(3) {
    top: 24px;
    height: 4px;
    border-radius: 4px;
    transition: .4s;
  }

  .menuModal:nth-of-type(1) {
    transform: translate(-14px, 8px) rotate(45deg);
    transition: .4s;
    position: absolute;
    background: blue;
  }
  .menuModal:nth-of-type(2) {
    display: none;
    transition: .4s;
  }
  .menuModal:nth-of-type(3) {
    transform: translate(-14px, -8px) rotate(135deg);
    position: absolute;
    transition: .4s;
    background: blue;
  }


  .size {
    font-size: 24px;
    color: white;
  }

  #logo {
    width: 100%;
    height: 40px;
    background: blue;
    display: flex;
    justify-content: space-between;
    margin: 0;
    position: fixed;
    top: 0;
    z-index: 3;
  }

  #logo h1 {
    margin: 0 0 0 10px;
    color: white;
    font-size: 24px;
  }

  .size {
    font-size: 30px;
    margin-top: 2px;
    margin-left: 10px;
  }


  /* モーダル */
  .menu-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    /* background: white; */
    z-index: 4;
    transition: .4s;
  }
  .menu-modal__container {
    position: absolute;
    top: 0;
    width: 70vw;
    height: 100vh;
    background: white;
    color: blue;
    transition: .4s;
  }
  .menu-modal__inner {
    margin-top: 40px;
  }
  .choice__link {
    list-style: none;
    padding: 0;
  }
  .choice__link button:not(:first-of-type) {
    border-top: none;
  }
  .sp__icon {
    margin-top: 14px;
    color: blue;
  }
  .sp__icon:hover {
    margin-top: 14px;
    color: white;
  }
  .link__home,
  .link__mypage,
  .link__login,
  .link__top,
  .link__logout {
    display: flex;
    width: 100%;
    height: 60px;
    background: white;
    border: 2px solid gray;
    border-right: none;
    border-left: none;
  }
  .link__home:hover,
  .link__mypage:hover,
  .link__login:hover,
  .link__top:hover,
  .link__logout:hover {
    background: blue;
    color: white;
    font-size: 24px;
  }
  .link__title {
    margin: 0 auto;
    line-height: 60px;
  }

  .toggleMemuModal {
    position: absolute;
    left: -100vw;
    transition: .4s;
  }
}


</style>
