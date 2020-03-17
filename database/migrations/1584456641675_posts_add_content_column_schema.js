'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsAddContentColumnSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.text('content', 'longtext')
      // alter table
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropColumn('content')
      // reverse alternations
    })
  }
}

module.exports = PostsAddContentColumnSchema
