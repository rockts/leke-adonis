'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsAddUserIdColumnSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      // alter table
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropForeign('user_id')
      table.dropColumn('user_id')
      // reverse alternations
    })
  }
}

module.exports = PostsAddUserIdColumnSchema
