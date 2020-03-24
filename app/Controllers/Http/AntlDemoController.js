'use strict'

class AntlDemoController {
  async demo ({ view, antl, locale }) {
    return view.render('demo.antl', {
      locale,
      // message: antl.formatNumber(0.333333, {
        // minimumIntegerDigits: 2
        // minimumFractionDigits: 2
        // maximumFractionDigits: 2
        // style: 'percent'
      // })
      // message: antl.formatNumber(0.33333, {
      //   style: 'currency',
      //   // currency: 'usd'
      //   currency: 'cny',
      //   currencyDisplay: 'name'
      // }),
      message: antl.formatAmount(30, 'usd')
    })

  }
}

module.exports = AntlDemoController
