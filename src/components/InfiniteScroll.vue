<template>
  <template
    v-for="(item, index) in items"
    :key="index"
  >
    <slot :item="item" />
  </template>
  <div id="intersectionTarget" />
  <Spinner v-if="isFetching" />
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  components: { Spinner },
  props: {
    items: {
      type: Array,
      required: true
    },
    isFetching: {
      type: Boolean,
      default: false
    },
    observerMargin: {
      type: String,
      default: '0px 0px 200px 0px'
    }
  },
  emits: ['intersect'],
  mounted () {
    const observer = new IntersectionObserver(
      (entries, _) => {
        if (entries[0].isIntersecting) {
          this.$emit('intersect', entries)
        }
      },
      {
        rootMargin: this.observerMargin,
        treshold: 1.0
      }
    )
    observer.observe(document.querySelector('#intersectionTarget'))
  }
}
</script>
