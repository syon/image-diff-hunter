<template>
  <div class="pixeldiffimage flex justify-center">
    <img v-if="x" :src="x['dataURL-D']" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('shelf', {
      entrySet: (state) => state.entrySet
    }),
    ...mapState('ing', {
      filename: (state) => state.filename
    }),
    x() {
      return this.entrySet[this.filename]
    }
  }
}
</script>

<style scoped>
.pixeldiffimage img {
  max-width: 500px;
}
</style>
