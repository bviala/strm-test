<template>
  <div class="article">
    <div class="article__source">
      <p>{{ article.source.name }}</p>
      <!-- <img :src="article.source.logo_url"> --> <!-- TODO: source logo implemention -->
    </div>
    <a :href="article.url">{{ article.title }}</a>
    <p
      v-if="displayedAuthor"
      class="article__author"
    >
      by {{ displayedAuthor }}
    </p>
    <p class="article__word-count">
      {{ article.word_count }} words
    </p>
    <p class="article__date">
      {{ formattedPublicationDate }} at {{ formattedPublicationTime }}
    </p>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedPublicationDate () {
      return dayjs(this.article.published_at).format('dddd D MMMM YYYY')
    },
    formattedPublicationTime () {
      return dayjs(this.article.published_at).format('h:mm')
    },
    displayedAuthor () {
      return this.article.author.name !== this.article.source.name ? this.article.author.name : null
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: lightgray;
$text-details-color: gray;
$link-hover-color: lightseagreen;

.article {
  background: white;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: .25rem 2rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .article__source, .article__author, .article__date, .article__word-count {
    font-size: .875rem;
    color: $text-details-color;
  }

  a {
    font-size: 1.5rem;
    text-decoration: none;
    color: inherit;
    &:hover {
      color: $link-hover-color;
    }
  }
}
</style>
