<template>
  <div />
</template>

<script>
import { getArticles } from '@/api/articles'

const PAGE_SIZE = 10

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      articles: [],
      nextPageToFetch: 1
    }
  },
  created () {
    getArticles(this.nextPageToFetch, PAGE_SIZE)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
