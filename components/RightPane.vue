<template>
  <div class="flex flex-wrap">
    <ing-info />
    <div class="w-full">
      <div>
        <ul
          class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-center"
        >
          <li class="-mb-px mr-6 last:mr-0 text-center cursor-pointer">
            <a
              :class="{
                'btn-neumo-off': openTab !== 1,
                'btn-neumo-on': openTab === 1
              }"
              class="text-xs font-bold uppercase px-5 py-3 block leading-normal"
              @click="toggleTabs(1)"
            >
              <i class="fas fa-space-shuttle text-base mr-1"></i>Slider
            </a>
          </li>
          <li class="-mb-px mr-6 last:mr-0 text-center cursor-pointer">
            <a
              class="text-xs font-bold uppercase px-5 py-3 block leading-normal"
              :class="{
                'btn-neumo-off': openTab !== 2,
                'btn-neumo-on': openTab === 2
              }"
              @click="toggleTabs(2)"
            >
              <i class="fas fa-cog text-base mr-1"></i>Fade
            </a>
          </li>
          <li class="-mb-px mr-6 last:mr-0 text-center cursor-pointer">
            <a
              class="text-xs font-bold uppercase px-5 py-3 block leading-normal"
              :class="{
                'btn-neumo-off': openTab !== 3,
                'btn-neumo-on': openTab === 3
              }"
              @click="toggleTabs(3)"
            >
              <i class="fas fa-briefcase text-base mr-1"></i>Diff
            </a>
          </li>
        </ul>
      </div>
      <div class="relative flex flex-col min-w-0 break-words w-full mb-6">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <image-slider />
            </div>
            <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <fade-slider />
            </div>
            <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <pixel-diff-image />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngInfo from '@/components/IngInfo'
import PixelDiffImage from '@/components/PixelDiffImage'
import ImageSlider from '@/components/ImageSlider'
import FadeSlider from '@/components/FadeSlider'

export default {
  components: { IngInfo, PixelDiffImage, ImageSlider, FadeSlider },
  data() {
    return {
      openTab: 1
    }
  },
  methods: {
    toggleTabs(tabNumber) {
      this.openTab = tabNumber
    }
  }
}
</script>

<style scoped>
.btn-neumo-on {
  border-radius: 5px;
  background: #e0e5ec;
  box-shadow: inset 4px 4px 7px #bec3c9, inset -4px -4px 7px #ffffff;
}
.btn-neumo-off {
  border-radius: 5px;
  background: linear-gradient(145deg, #caced4, #f0f5fd);
  box-shadow: 4px 4px 7px #bec3c9, -4px -4px 7px #ffffff;
}
</style>
