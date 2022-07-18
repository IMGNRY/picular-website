<script setup lang="ts">
import { UseElementSize } from '@vueuse/components'
import { ref } from 'vue';

defineProps<{ id: number, index: number }>()

const pixelDensity = window.devicePixelRatio
const banana = ref(0)

function roundUpToNearest(number: number, nearest: number) {
  return Math.ceil(number / nearest) * nearest
}

</script>

<template>
  <UseElementSize :width="banana" :height="banana" v-slot="{ width }">
    <TransitionGroup>
      <img
        v-if="index == 1"
        :src="`https://ik.imagekit.io/picular/web/tr:w-${roundUpToNearest(width * pixelDensity, 100)}/vision-${id}a.png`"
        loading="lazy"
      />
      <img
        v-if="index == 2"
        :src="`https://ik.imagekit.io/picular/web/tr:w-${roundUpToNearest(width * pixelDensity, 100)}/vision-${id}b.png`"
        loading="lazy"
      />
      <img
        v-if="index == 3"
        :src="`https://ik.imagekit.io/picular/web/tr:w-${roundUpToNearest(width * pixelDensity, 100)}/vision-${id}c.png`"
        loading="lazy"
      />
      <img
        v-if="index == 4"
        :src="`https://ik.imagekit.io/picular/web/tr:w-${roundUpToNearest(width * pixelDensity, 100)}/vision-${id}d.png`"
        loading="lazy"
      />
    </TransitionGroup>
  </UseElementSize>
</template>

<style lang="scss" scoped>
img {
  position: absolute;
  width: 100%;

  transition: all 2s cubic-bezier(0.65, 0, 0.35, 1);
  transform: translateX(1px);
  opacity: 0.9999;

  &.v-enter-from {
    transform: translateX(100px);
    opacity: 0;
  }

  &.v-leave-to {
    transform: translateX(-100px);
    opacity: 0;
  }
}
</style>
