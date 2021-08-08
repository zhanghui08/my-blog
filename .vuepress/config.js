module.exports = {
  "title": "Mr. Zhang's blog",
  "description": "",
  // "dest": "public",
  "serviceWorker": true, // 是否开启 PWA
  "base": '/my-blog/', // 部署到github相关的配置
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Category",
        "icon": "reco-blog",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          },
          {
            "text": "Vue",
            "link": "/docs/vue/"
          },
          {
            "text": "Git",
            "link": "/docs/git/"
          }
        ]
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        // "text": "Contact",
        "text": "GitHub",
        // "icon": "reco-message",
        "icon": "reco-github",
        "link": "https://zhanghui08.github.io/my-blog/",
        // "items": [
        //   {
        //     "text": "GitHub",
        //     "link": "https://zhanghui08.github.io/my-blog/",
        //     "icon": "reco-github"
        //   }
        // ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ],
      "/docs/vue/":[
        "",
        "theme",
        "plugin",
        "api",
        "test"
      ],
      "/docs/git/": [
        "",
        "git-cy"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 3,
        "text": "Work record",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
      "tag": {
        "location": 5,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logn-n.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "",
    "authorAvatar": "/logn-n.jpg",
    "record": "xxxx",
    "startYear": "2017"
  },
  "locales":{
    '/':{
      'lang':'zh-CN'
    }
  },
  "cursor-effects": {
    "size": 3,                    // size of the particle, default: 2
    "shape": ['circle'],  // shape of the particle, default: 'star'
    "zIndex": 999999999           // z-index property of the canvas, default: 999999999
  },
  "markdown": {
    "lineNumbers": true
  }
}