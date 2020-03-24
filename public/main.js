(function() {
  'use strict'

  const deleteButton = $('#delete')

  deleteButton.click(() => {
    const id = deleteButton.data('id')
    const _csrf = deleteButton.data('csrf')

    $.ajax({
      url: `/posts/${ id }`,
      method: 'DELETE',
      data: {
        _csrf
      },
      success: (response) => {
        if (response === 'success') {
          window.location.href= '/posts'
        }
      }
    })
  })

  const localeSwitch = $('#locale-switch')

  localeSwitch.change(() => {
    localeSwitch.submit()
  })

}())
