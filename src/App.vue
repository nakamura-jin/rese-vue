<template>
  <div id="app">
    <div id="logo" @click="SiteHome">
    <fa icon="poll-h" class="icon" size="3x" />
    <h1>Rese</h1>
  </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    SiteHome() {
      firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/rese')
      })
    }
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

#logo {
  display: flex;
  margin-top: 30px;
  color: blue;
  cursor: pointer;
}

#logo h1 {
  margin: 0 0 0 10px;
}

.icon {
  box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
}
</style>
