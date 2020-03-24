'use strict'

class AntlDemoController {
  async demo ({ view, antl, locale }) {
    return view.render('demo.antl', {
      greeting: antl.formatMessage('demo.greeting', { name: 'gaopeng' }),
      locale,
      message: antl.formatNumber(0.333333, {
        // minimumIntegerDigits: 2
        // minimumFractionDigits: 2
        // maximumFractionDigits: 2
        style: 'percent'
      })
    })
  }
}

module.exports = AntlDemoController
