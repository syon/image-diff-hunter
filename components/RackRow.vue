<template>
  <div class="flex flex-col mb-4">
    <div class="flex">
      <span>{{ x.name }}</span>
      ／
      <span>{{ x.width }} x {{ x.height }}</span>
      ／
      <span>{{ x.mismatchedPixels }}</span>
      ／
      <span
        >{{
          ((x.mismatchedPixels / (x.width * x.height)) * 100).toFixed(2)
        }}
        %</span
      >
    </div>
    <div @click="handleClick" class="flex bg-white shadow">
      <div class="col">
        <screen-img :name="x.name" :key="x.name" prefix="L" class="scr-img" />
      </div>
      <div class="col">
        <screen-img :name="x.name" :key="x.name" prefix="R" class="scr-img" />
      </div>
      <canvas :id="`L-${x.name}`" style="display:none;" />
      <canvas :id="`R-${x.name}`" style="display:none;" />
      <canvas :id="`D-${x.name}`" style="display:none;" />
      <img :src="x['dataURL-D']" class="dif-img" />
    </div>
  </div>
</template>

<script>
import ScreenImg from '@/components/ScreenImg'

export default {
  components: {
    ScreenImg
  },
  props: { item: { type: Object, required: true } },
  computed: {
    x() {
      return this.item
    }
  },
  methods: {
    handleClick() {
      this.$store.dispatch('ing/update', this.item.name)
    }
  }
}
</script>
