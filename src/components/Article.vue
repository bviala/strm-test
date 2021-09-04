<template>
  <div class="article">
    <div class="article__header">
      <div class="article__source">
        <p>{{ article.source.name }}</p>
      <!-- <img :src="article.source.logo_url"> --> <!-- TODO: source logo implemention -->
      </div>
      <p class="article__date">
        {{ formattedPublicationTime }}
      </p>
    </div>
    <a
      :href="article.url"
      target="_blank"
    >{{ article.title }}</a>
    <div>
      <span
        v-if="displayedAuthor"
        class="article__author"
      >
        by {{ displayedAuthor }} &nbsp;&mdash;&nbsp;
      </span>
      <span class="article__word-count">
        {{ article.word_count }} words
      </span>
    </div>

    <div
      v-if="article.excerpts.length"
      class="article__excerpts"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="article.excerpts[0].text" />
      <button
        v-if="additionalExcerpts"
        @click="toggleAdditionalExcerpts"
      >
        {{ showAdditionalExcerpts ? 'hide' : 'more' }}
      </button>
      <div v-if="showAdditionalExcerpts">
        <template
          v-for="(excerpt, index) in additionalExcerpts"
          :key="index"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="excerpt.text" />
          <hr>
        </template>
      </div>
    </div>
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
  data () {
    return {
      showAdditionalExcerpts: false
    }
  },
  computed: {
    formattedPublicationTime () {
      return dayjs(this.article.published_at).format('h:mm')
    },
    displayedAuthor () {
      return this.article.author.name !== this.article.source.name ? this.article.author.name : null
    },
    additionalExcerpts () {
      return this.article.excerpts.length > 1 ? this.article.excerpts.slice(1) : null
    }
  },
  methods: {
    toggleAdditionalExcerpts () {
      this.showAdditionalExcerpts = !this.showAdditionalExcerpts
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  background: $card-background;
  border-radius: $card-border-radius;
  padding: $card-padding;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .article__source, .article__author, .article__date, .article__word-count {
    font-size: .875rem;
    color: $text-light;
  }

  .article__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > :first-child {
      margin-right: 1rem;
    }
    p {
      margin-top: 0;
    }
  }

  .article__excerpts {
    color: $text-medium;
    p {
      font-style: italic;
      margin: .5rem 0;
    }
    p ::v-deep em {
      background: $text-highlight-color;
    }
    button {
      border: 1px solid $border-color;
      border-radius: 2px;
      background: none;
      padding: 4px 8px;
      cursor: pointer;
      font-size: .75rem;
      &:hover {
        background: lightgray;
      }
    }

    hr {
      margin: 0;
      &:last-child {
        display: none;
      }
      color: $background-color;
      width: 100px;
    }
  }

  a {
    font-size: 1.5rem;
    text-decoration: none;
    color: inherit;
    &:hover {
      color: $primary;
    }
  }

}
</style>
