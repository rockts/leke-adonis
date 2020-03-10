'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// Route.post('/posts', ({ request }) => request.post())
// Route.post('/posts', ({ request }) => request.all())
// Route.post('/posts', ({ request }) => request.only(['title', 'content']))
// Route.post('/posts', ({ request }) => request.except(['title', 'content']))
// Route.post('/posts', ({ request }) => request.input('status', 'draft'))

// Route.post('/posts', ({ request }) => request.only(['title', 'content']))
// Route.post('/posts', ({ request }) => request.collect(['title', 'content']))

Route.get('/posts', ({ request }) => request.header('user-agent'))
