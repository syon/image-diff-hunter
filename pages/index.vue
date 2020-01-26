<template>
  <div class="container">
    <shelf prefix="L" />
    <shelf prefix="R" />
    <button
      @click="exeAllDiff"
      class="bg-pink-500 text-white active:bg-pink-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style="transition: all .15s ease"
    >
      exeAllDiff
    </button>
    <div>
      <div v-for="x of allEntries" :key="x.name">
        <NuxtLink :to="{ path: 'slider', query: { name: x.name } }" class="row">
          <div class="col">
            <screen-img
              :name="x.name"
              :key="x.name"
              prefix="L"
              class="scr-img"
            />
          </div>
          <div class="col">
            <screen-img
              :name="x.name"
              :key="x.name"
              prefix="R"
              class="scr-img"
            />
          </div>
          <canvas :id="`L-${x.name}`" style="display:none;" />
          <canvas :id="`R-${x.name}`" style="display:none;" />
          <canvas :id="`D-${x.name}`" style="display:none;" />
          <img :src="x['dataURL-D']" class="dif-img" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import pixelmatch from 'pixelmatch'
import { mapGetters } from 'vuex'
import Shelf from '@/components/Shelf'
import ScreenImg from '@/components/ScreenImg'

export default {
  components: {
    Shelf,
    ScreenImg
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      allEntries: 'shelf/allEntries'
    })
  },
  methods: {
    exeAllDiff() {
      this.allEntries.forEach(({ name }) => {
        const url = this.doDiff(name)
        this.$store.dispatch('shelf/loadDiff', { name, dataURL: url })
      })
    },
    doDiff(filename) {
      console.log('doDiff:', filename)
      const base = document.getElementById(`L-${filename}`)
      if (!base) return null
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
      return u
    },
    getImageContext(id) {
      const canvas = document.getElementById(id)
      if (!canvas) {
        console.warn('[UNEXPECTED] getImageContext is null.', id)
      }
      return canvas.getContext('2d')
    }
  }
}
</script>

<style>
.container {
  margin: auto;
}
.row {
  display: flex;
}
.scr-img {
  width: 200px;
}
.dif-img {
  width: 200px;
}
</style>
