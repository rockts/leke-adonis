'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Verification extends Model {
  Verification () {
    return this.hasOne('App/Models/Verification')
  }


  user () {
    return this.belongsTo('App/Models/Profile')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }

  static boot () {
    super.boot()
  }
}

module.exports = Verification
