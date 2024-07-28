export const footerData = (categories) => [{
    title: 'categories',
    data: categories.map(category => {
      return ({
        'text': category?.name,
        'link': `/home/categories/${category?.id}`
      })
    })
  },
  {
    title: 'sections',
    data: [{
        text: 'home',
        link: '/home'
      },
      {
        text: 'cart',
        link: '/home/cart'
      },
      {
        text: 'saved',
        link: '/home/saved'
      },
      {
        text: 'profile',
        link: '/home/profile'
      }
    ]
  },
  {
    title: 'more links',
    data: [{
        text: 'categories',
        link: '/home/categories'
      },
      {
        text: 'search',
        link: '/home/search'
      },
      {
        text: 'update information',
        link: '/home/updateInfo'
      },
    ]
  }
]