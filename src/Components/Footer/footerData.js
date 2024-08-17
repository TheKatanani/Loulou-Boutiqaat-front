export const footerData = (الأقسام) => [{
    title: 'الأقسام',
    data: الأقسام.map(category => {
      return ({
        'text': category?.name,
        'link': `/home/الأقسام/${category?.id}`
      })
    })
  },
  {
    title: 'الصفحات',
    data: [{
        text: 'الرئيسية',
        link: '/home'
      },
      {
        text: 'السلة',
        link: '/home/cart'
      },
      {
        text: 'أعجبني',
        link: '/home/saved'
      },
      {
        text: 'الصفحة الشخصية',
        link: '/home/profile'
      }
    ]
  },
  {
    title: 'المزيد من الصفحات',
    data: [{
        text: 'الأقسام',
        link: '/home/الأقسام'
      },
      {
        text: 'البحث',
        link: '/home/search'
      },
      {
        text: 'تعديل المعلومات الشخصية',
        link: '/home/updateInfo'
      },
    ]
  }
]