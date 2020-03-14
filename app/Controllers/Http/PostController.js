'use strict'

class PostController {
  index ({ view }) {
    const pageTitle = 'Posts'

    return view.render('posts.index', { pageTitle })
  }
}

module.exports = PostController
