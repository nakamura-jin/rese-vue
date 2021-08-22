<template>
  <div class="shop__register">
    <div class="shopRegister__thanks">
      <p>ご登録ありがとうございます。</p>
      <p>はじめに店舗情報の登録をお願いします。</p>
    </div>
    <div class="shopRegister__form">
      <table class="shopRegister__inner">
        <tr>
          <th>店舗名</th>
          <td>
            <validation-provider v-slot="{ errors }" rules="required">
              <input type="text" v-model="shopName" class="shopRegister__shopName" name="店舗名">
              <div class="shopRegister__error">{{ errors[0] }}</div>
            </validation-provider>
          </td>
        </tr>
        <tr>
          <th>店舗概要</th>
          <td>
            <validation-provider v-slot="{ errors }" rules="required">
              <textarea
                cols="20"
                rows="10"
                v-model="overview"
                class="shopRegister__overview"
                name="店舗概要">
              </textarea>
              <div class="shopRegister__error">{{ errors[0] }}</div>
            </validation-provider>
          </td>
        </tr>
        <tr>
          <th>エリア</th>
          <td>
            <validation-provider v-slot="{ errors }" rules="required">
              <select v-model="shopArea" class="shopRegister__shopArea" name="エリア">
                <option value="1">東京</option>
                <option value="2">大阪</option>
                <option value="3">福岡</option>
              </select>
              <div class="shopRegister__error">{{ errors[0] }}</div>
            </validation-provider>
          </td>
        </tr>
        <tr>
          <th>ジャンル</th>
          <td>
            <validation-provider v-slot="{ errors }" rules="required">
              <select v-model="shopGenre" class="shopRegister__shopGenre" name="ジャンル">
                <option value="1">寿司</option>
                <option value="2">焼肉</option>
                <option value="3">居酒屋</option>
                <option value="4">イタリアン</option>
                <option value="5">ラーメン</option>
              </select>
              <div class="shopRegister__error">{{ errors[0] }}</div>
            </validation-provider>
          </td>
        </tr>
        <tr>
          <th>店舗写真</th>
          <td>
            <div class="image__switch">
              <input type="file" ref="preview" @change="uploadFile" class="shopRegister__image">
              <button v-if="url" @click="deleteImage" class="image__clear">画像を取り消す</button>
            </div>
          </td>
        </tr>
        <tr>
          <th></th>
          <td>
            <div v-if="url">
              <img :src="url" class="image__preview">
            </div>
          </td>
        </tr>
      </table>
        <div class="shopRegister__button">
          <button @click="resetShop" class="shopRegister__reset">リセット</button>
          <button @click="confirmShop" class="shopRegister__confirm">確認</button>
        </div>
    </div>

    <!-- モーダル -->
    <div class="confirm__modal" :class="{ shopConfirm: shopCreate }">
      <div class="confirm__container">
        <div class="confirm__inner">
          <p v-if="createdShop" class="craeted__shop">店舗登録が完了しました</p>
          <!-- 店舗登録確認 -->
            <table class="confirm__shop" v-if="createdShop == false">
              <tr>
                <th>店舗名</th>
                <td>{{ this.shopName }}</td>
              </tr>
              <tr>
                <th>店舗概要</th>
                <td>{{ this.overview }}</td>
              </tr>
              <tr>
                <th>エリア</th>
                <td>
                  <div v-if="this.shopArea == 1">東京</div>
                  <div v-if="this.shopArea == 2">大阪</div>
                  <div v-if="this.shopArea == 3">福岡</div>
                </td>
              </tr>
              <tr>
                <th>ジャンル</th>
                <td>
                  <div v-if="this.shopGenre == 1">寿司</div>
                  <div v-if="this.shopGenre == 2">焼肉</div>
                  <div v-if="this.shopGenre == 3">居酒屋</div>
                  <div v-if="this.shopGenre == 4">イタリアン</div>
                  <div v-if="this.shopGenre == 5">ラーメン</div>
                </td>
              </tr>
              <tr>
                <th>店舗画像</th>
                <td>
                  <div v-if="url">
                    <img :src="url" class="confirm-image">
                    <progress value="0%" max="100%" id="uploader" class="uploader">0%</progress>
                    <div v-if="errorMessage">
                      {{ error_massage }}
                    </div>
                  </div>
                  <div v-else>画像はありません</div>
                </td>
              </tr>
            </table>
          <div class="confirm__button" v-if="createdShop == false">
            <button @click="closeConfirmModal" class="shopRegister__back">戻る</button>
            <button @click="registerShop" class="shopRegister__create">登録</button>
          </div>
          <button v-if="createdShop" class="owner__login" @click="ownerPage">オーナーページへ</button>
        </div>
      </div>
    </div>
    <!-- ここまでモーダル -->
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
export default {
  name: 'ShopRegister',
  data() {
    return {
      shopName: '',
      overview: '',
      shopArea: '',
      shopGenre: '',
      file: '',
      url: '',
      makeURL: '',
      running: '',
      error_message: '',
      shopCreate: true,
      createdShop: false,
      errorMessage: false,
    }
  },
  methods: {
    registerShop() {
      // storageに保存
      let makeFile = this.file
      var storageRef = firebase.storage().ref('rese/' + makeFile.name);
      var uploadTask = storageRef.put(makeFile);

      var uploader = document.getElementById('uploader')
      uploadTask.on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage
      }, (error) => {
        this.errorMessage = true
        this.error_message = error
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firebase
          .auth()
          .onAuthStateChanged((user) => {
            const sendShopData = {
              shopname: this.shopName,
              overview: this.overview,
              area_id: this.shopArea,
              genre_id: this.shopGenre,
              image: downloadURL,
              owner_id: user.uid,
            }
            if(sendShopData.image  == undefined) {
              sendShopData.image = 'no_image.png'
            }
            axios.post('https://rese-app.herokuapp.com/api/v1/owners/' + user.uid + '/shop', sendShopData)
              .then(() => {
                this.createdShop = true;
                this.resetShop();
              })
          })
        });
      });
    },
    uploadFile(){
      this.file = this.$refs.preview.files[0]
      this.url = URL.createObjectURL(this.file)
    },
    deleteImage() {
      this.url = '';
      this.$refs.preview.value = "";
    },
    resetShop() {
      this.shopName =  '',
      this.overview = '',
      this.shopArea = '',
      this.shopGenre = '',
      this.url = '',
      this.$refs.preview.value = "";
    },
    confirmShop() {
      this.shopCreate = !this.shopCreate
    },
    closeConfirmModal() {
      this.shopCreate = true
    },
    ownerPage() {
      this.$router.push('/owner')
    }
  }
}
</script>

<style>
  .shopRegister__thanks {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .shopRegister__thanks p {
    margin: 0;
  }
  .shopRegister__form {
    width: 80%;
    margin: 0 auto 50px;
    background: skyblue;
    border-radius: 8px;
  }
  .shopRegister__inner {
    padding: 20px;
    width: 100%;
  }
  .shopRegister__inner th {
    width: 15%;
  }
  .shopRegister__shopName,
  .shopRegister__overview {
    width: 98%;
    padding: 10px;
    border: none;
    border-radius: 8px;
  }
  .shopRegister__shopArea,
  .shopRegister__shopGenre {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
  }
  .image__preview {
    width: 100%;
  }
  .uploader {
    display: flex;
    width: 100px;
  }
  .image__switch {
    display: flex;
  }
  .shopRegister__image {
    width: 40%;
  }
  .shopRegister__button {
    width: 30%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .shopRegister__reset,
  .shopRegister__confirm {
    margin: 20px 0;
    padding: 6px 20px;
    border-radius: 6px;
    border: none;
  }
  .shopRegister__error {
    color: red;
  }

  /* モーダル */

  .confirm__modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  z-index: 1;
}
.confirm__container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 70%;
  background: white;
  border-radius: 4px;
  border: 4px solid skyblue;
}
.confirm__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  /* height: 100%; */
}
.confirm__shop {
  padding: 0 30px;
}
.confirm__shop th {
  width: 10%;
}
.confirm-image {
  width: 100px;
  height: 100px;
}
.confirm__button {
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin: 0 auto;
}
.shopRegister__back,
.shopRegister__create {
  margin: 20px 0;
  padding: 6px 30px;
  border-radius: 6px;
  border: none;
  background: skyblue;
  cursor: pointer;
}
.owner__login {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: skyblue;
  cursor: pointer;
}
.shopConfirm {
  display: none;
}
.craeted__shop {
  margin-bottom: 10%;
  font-size: 24px;
  font-weight: bold;
}
</style>
