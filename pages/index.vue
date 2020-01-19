<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <shelf prefix="L" />
      </div>
      <div class="col">
        <shelf prefix="R" />
      </div>
      <div class="col">
        <div v-for="x of allEntries" :key="x.name">
          <div style="height:100px;">
            <button @click="doDiff(x.name)">doDiff</button>
          </div>
          <canvas :id="`D-${x.name}`" style="display:none;" />
        </div>
        <img :src="aaaaaaaa" class="dif-img" />
      </div>
    </div>
  </div>
</template>

<script>
import pixelmatch from 'pixelmatch'
import { mapGetters } from 'vuex'
import Shelf from '@/components/Shelf'

export default {
  components: {
    Shelf
  },
  data() {
    return { aaaaaaaa: '' }
  },
  computed: {
    ...mapGetters({
      allEntries: 'shelf/allEntries'
    })
  },
  methods: {
    doDiff(filename) {
      const base = document.getElementById(`L-${filename}`)
      const width = base.width
      const height = base.height
      console.log({ width, height })
      const img1 = this.getImageContext(`L-${filename}`).getImageData(
        0,
        0,
        width,
        height
      )
      const img2 = this.getImageContext(`R-${filename}`).getImageData(
        0,
        0,
        width,
        height
      )
      const diff = this.getImageContext(`D-${filename}`).createImageData(
        width,
        height
      )
      const difCanvas = document.getElementById(`D-${filename}`)
      difCanvas.width = width
      difCanvas.height = height

      pixelmatch(img1.data, img2.data, diff.data, width, height, {
        threshold: 0.1
      })

      this.getImageContext(`D-${filename}`).putImageData(
        diff,
        0,
        0,
        0,
        0,
        width,
        height
      )

      const u = difCanvas.toDataURL('image/png')
      this.aaaaaaaa = u
    },
    getImageContext(id) {
      const canvas = document.getElementById(id)
      return canvas.getContext('2d')
    }
  }
}
</script>

<style>
.row {
  display: flex;
}
.dif-img {
  width: 200px;
}
</style>
