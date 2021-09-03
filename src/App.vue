<template>
  <main>
    <InfiniteScroll
      :items="articles"
      :is-fetching="isFetching"
      @intersect="fetchNextPage"
    >
      <template #default="slotProps">
        <Article :article="slotProps.item" />
      </template>
    </InfiniteScroll>
  </main>
</template>

<script>
import { getArticles } from '@/api/articles'
import Article from '@/components/Article.vue'
import InfiniteScroll from '@/components/InfiniteScroll.vue'

const PAGE_SIZE = 10

export default {
  name: 'App',
  components: {
    Article,
    InfiniteScroll
  },
  data () {
    return {
      articles: [],
      nextPageToFetch: 1,
      isFetching: false,
      hasFetchedAll: false
    }
  },
  methods: {
    fetchNextPage () {
      if (this.hasFetchedAll) return

      this.isFetching = true

      getArticles(this.nextPageToFetch, PAGE_SIZE)
        .then(result => {
          if (result.length) {
            this.articles = [...this.articles, ...result]
            this.nextPageToFetch++
          } else {
            this.hasFetchedAll = true
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.isFetching = false
        })
    }
  }
}
</script>

<style lang="scss">
$background-color: lightcyan;

html, body {
  height: 100%;
}

body {
  margin: 0;
  background: $background-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}
main {
  max-width: 800px;
}
</style>
