const getArticles = async (page, pageSize) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/articles?page=${page}&pageSize=${pageSize}`)
    return response.json()
  } catch (error) {
    throw new Error(error)
  }
}

// Used to test sticky headings
const fakeArticle = [
  {
    id: 42,
    type: 'article',
    timestamp: 1620172075,
    created_at: '2021-05-04T21:37:17.000Z',
    published_at: '2021-05-05T23:47:55.000Z',
    url: 'https://www.theguardian.com/australia-news/live/2021/may/05/australia-news-live-india-community-talks-alex-hawke-cricket-vaccine-gps-shortfall-astrazeneca',
    title: 'Australia news live: Biloela family may be released on Christmas Island; minister to hold talks with Indian-Australian community leaders',
    word_count: 4885,
    medium: 'Online',
    source: {
      id: 27,
      name: 'The Guardian',
      logo_url: 'https://cdn.streem.com.au/logos/publishers/The Guardian.png'
    },
    author: {
      name: 'Matilda Boseley, Mostafa Rachwani, Daniel Hurst'
    },
    excerpts: [
      {
        keywords: [
          'Scott Morrison'
        ],
        text: 'rules and then yesterday morning we had <em>Scott Morrison</em> saying virtually no chance, “almost zero possibility” of implementing the laws and then today on your program'
      },
      {
        keywords: [
          'Scott Morrison'
        ],
        text: '<em>Scott Morrison</em> saying virtually no chance, “almost zero possibility” of implementing the laws and then today on your program we had - it has now become absolutely zero possibility. This is a shambles.'
      },
      {
        keywords: [
          'Scott Morrison'
        ],
        text: 'The government should be getting the vaccinations right and it should be getting quarantine right. <em>Scott Morrison</em> said that Australians would be brought home by Christmas and we know that more than 35,000 Australians remain stranded overseas.'
      },
      {
        keywords: [
          'Scott Morrison'
        ],
        text: '<em>Scott Morrison</em> now says there is “pretty much zero” chance of harsh sanctions actually being imposed but has remained steadfast that repatriation flights will not resume before 15 May. A team source told the Times ofIndia: Hussey tested positive.'
      }
    ],
    keywords: {
      'Scott Morrison': 4
    }
  }
]

export { getArticles, fakeArticle }
