'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
class UserSeeder {
  async run () {
    const users = [
      { username: '张三', email: 'z3@lekee.cc', password: '111111' },
      { username: '李四', email: 'l4@lekee.cc', password: '111111' }
    ]

    User.createMany(users)
  }
}

module.exports = UserSeeder
