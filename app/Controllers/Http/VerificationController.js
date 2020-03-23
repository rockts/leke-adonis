'use strict'

const Verification = use('App/Models/Verification')

class VerificationController {
  async verify ({ params, auth, session, response }) {
    const { token } = params
    const verification = await Verification.findByOrFail('token', token)

    const user = await verification
      .user()
      .fetch()

    user.is_verified = true
    await user.save()

    try {
      await auth.check()
    } catch (error) {
      await auth.login(user)
    }

    await verification.delete()

    session.flash({
      type: 'success',
      message: 'Successfully verified your email.'
    })

    return response.route('users.show', { id: user.id })
  }
}

module.exports = VerificationController
