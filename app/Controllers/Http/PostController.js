'use strict'

class PostController {
  index ({ view }) {
    const pageTitle = 'List of <i>posts</i>'
    const user = {
      name: 'gaopeng'
    }

    return view.render('posts.index', { pageTitle, user })
  }
}

module.exports = PostController
