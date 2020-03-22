'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')
const { validateAll } = use('Validator')
const Route = use('Route')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const posts = await Post
      .query()
      .with('user', (builder) => {
        builder.select('id', 'username')
      })
      .with('user.profile')
      .paginate(1, 3)

    return posts

    console.log(posts.toJSON());
    // console.log(posts);
    // return posts
    return view.render('post.index', { posts: posts.toJSON() })

  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const users = await User.all()
    const tags = await Tag.all()
    return view.render('post.create', { users: users.toJSON(), tags: tags.toJSON() })
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const rules = {
      title: 'required',
      content: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }



    const newPost = request.only(['title', 'content'])
    const tags = request.input('tags')
    // const postID = await Database.insert(newPost).into('posts')
    // console.log('postID', postID)
    // const  post = await Post.create(newPost)

    const user = await User.find(request.input('user_id'))
    const post = await user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

    return response.redirect(`/posts/${ post.id }`)
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    // const post = await Database
    //  .from('posts')
    //  .where('id', params.id)
    //  .first()

    const post = await Post.findOrFail(params.id)

    const tags = await post
      .tags()
      .select('id', 'title')
      .fetch()

    return view.render('post.show', { post, tags: tags.toJSON() })
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const _post = await Post.findOrFail(params.id)

    const _users = await User.all()
    const users = _users.toJSON()
    const _tags = await Tag.all()
    const tags = _tags.toJSON()
    await _post.load('tags')
    const post = _post.toJSON()
    const postTagIds = post.tags.map(tag => tag.id)

     const tagItems = tags.map((tag) => {
       if (postTagIds.includes(tag.id)) {
         tag.checked = true
       }

       return tag
     })

    const userItems = users.map((user) => {
      if (user.id === post.user_id) {
        user.checked = true
      }

      return user
    })

    return view.render('post.edit', {
      post,
      users: userItems,
      tags: tagItems
     })
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const { title, content, user_id, tags } = request.all()
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .update(updatedPost)

    const post = await Post.findOrFail(params.id)
    post.merge({ title, content })
    await post.save()

    const user = await User.find(user_id)
    await post.user().associate(user)

    await post.tags().sync(tags)

    session.flash({
      type: 'primary',
      message: `Post updated. <a href="${ Route.url('PostController.show', { id: post.id }) }" class="alert-link">Preview post.</a>`
    })

    return response.redirect('back')
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .delete()

    const post = await Post.find(params.id)

    try {
      await post.tags().detach()
      await post.delete()
    } catch (error) {
      console.log(error)
    }

    return 'success'
  }
}

module.exports = PostController
