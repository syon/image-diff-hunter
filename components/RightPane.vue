<template>
  <div class="flex flex-wrap">
    <ing-info />
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            :class="{
              'text-pink-600 bg-white': openTab !== 1,
              'text-white bg-pink-600': openTab === 1
            }"
            class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            @click="toggleTabs(1)"
          >
            <i class="fas fa-space-shuttle text-base mr-1"></i> Profile
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'text-pink-600 bg-white': openTab !== 2,
              'text-white bg-pink-600': openTab === 2
            }"
            @click="toggleTabs(2)"
          >
            <i class="fas fa-cog text-base mr-1"></i> Settings
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'text-pink-600 bg-white': openTab !== 3,
              'text-white bg-pink-600': openTab === 3
            }"
            @click="toggleTabs(3)"
          >
            <i class="fas fa-briefcase text-base mr-1"></i> Options
          </a>
        </li>
      </ul>
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
