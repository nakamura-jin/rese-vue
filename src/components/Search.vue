<template>
  <div class="search">
    <div>
      <select name="area" class="select__area" v-model="area">
        <option>all area</option>
        <option>東京</option>
        <option>大阪</option>
        <option>福岡</option>
      </select><span></span>
      <select name="genle" class="select__genre" v-model="genre">
        <option>all genre</option>
        <option>寿司</option>
        <option>焼肉</option>
        <option>居酒屋</option>
        <option>イタリアン</option>
        <option>ラーメン</option>
      </select>
      <fa icon="search" class="search-icon" />
      <input type="text" class="search-bar" placeholder="Search ...">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      area: 'all area',
      genre: 'all genre'
    }
  },
}
</script>

<style>
  .search {
    width: 600px;
    height: 36px;
    background: white;
    text-align: left;
    line-height: 36px;
    padding: 6px;
    border-radius: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }
  .select__area, .select__genre {
    width: 110px;
    height: 26px;
    margin-left: 6px;
    font-size: 16px;
    border: none;
  }
  span {
    margin: 0 10px;
    border: 1px solid #eee;
  }
  .search-bar {
    width: 280px;
    height: 20px;
    border: none;
  }
  .search-icon {
    margin-left: 10px;
    margin-right: 6px;
    color: gray;
  }

</style>
