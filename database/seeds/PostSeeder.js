'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Post = use('App/Models/Post')

class PostSeeder {
  async run () {
    const posts = [
      { title: '停用社交网络', content: '这个月停用社交网络，专心工作，学习，顺道思考一下人生。', user_id: 1 },
      { title: '改造边大夫口腔', content: '虽然面对现在移动端这样的网站也许存在的意义不大，但这正是我技术的价值体现。', user_id: 1 },
      { title: '我们的方向', content: '面对这个城市和这个社会，我们应该还是需求核心的技术来应对更大的变革。', user_id: 2 },
      { title: 'Python 也许是未来的方向', content: '手动录入信息的时代应该过去，我们应该抓取大量的有价值资源然后加以分析也许是未来的发展的王道。', user_id: 1 },
      { title: '活着太不容易了', content: '曾经我们也是有理想有价值观的公司，无奈现在只能适者生存了。', user_id: 2 },
      { title: '什么才是价值和意义呢？', content: '真正要做的事是什么，海量技术又如何应用呢？', user_id: 1 }
    ]

    await Post.createMany(posts)
  }
}

module.exports = PostSeeder
