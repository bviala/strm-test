<template>
  <Article
    v-for="(article, index) in articles"
    :key="index"
    :article="article"
  />
  <Spinner />
  <IntersectionObserver
    @intersect="fetchNextPage"
  />
</template>

<script>
import { getArticles } from '@/api/articles'
import Article from '@/components/Article.vue'
import IntersectionObserver from '@/components/IntersectionObserver.vue'
import Spinner from '@/components/Spinner.vue'

const PAGE_SIZE = 10

export default {
  components: {
    Article,
    IntersectionObserver,
    Spinner
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
