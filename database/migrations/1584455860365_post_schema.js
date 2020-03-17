'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
      // alter table
    })
  }

  down () {
    this.drop('posts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PostSchema
