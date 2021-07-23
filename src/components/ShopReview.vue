<template>
  <div>
    <div v-for="shop in shops" :key="shop.id">
      <div class="review">
        <div class="star__base"  v-if="rev == 0">
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == half_0">
          <fa icon="star-half-alt" class="star__color"/>
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == 1">
          <fa icon="star" class="star__color" />
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == half_1">
          <fa icon="star" class="star__color" />
          <fa icon="star-half-alt" class="star__color"/>
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == 2">
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" />
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == half_2">
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star-half-alt" class="star__color"/>
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == 3">
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == half_3">
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star-half-alt" class="star__color"/>
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == 4">
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" />
        </div>
        <div class="star__base" v-else-if="rev == half_4">
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star-half-alt" class="star__color"/>
        </div>
        <div class="star__base" v-else>
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
          <fa icon="star" class="star__color" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopReview',
  
}

</script>

<style>
  .star__base {
    color: #ddd;
  }
  .star__color {
    color: goldenrod;
  }
</style>