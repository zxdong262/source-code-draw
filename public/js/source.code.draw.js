/*
 * source code draw app, 
 * created by zhaoxudong, zxdong@gmail.com, html5beta.com
*/

$(function() {
  var canvas = $('#canvas')[0]
  ,support = {
    canvas: !!canvas.getContext
    ,FileReader: !!window.FileReader
    ,File: !!window.File
  }

  if(!checkSupport()) return
  $('#workspace').removeClass('hide')



	//events handler
	$('#file').on('change', function (evt) {
    var f = evt.target.files[0]
    ,reader = new FileReader()
    ,output = ''

    reader.onload = function(e) {
      $('#output').append('<p><img alt="' + f.name + '" title="' + f.name + '" src="' + e.target.result + '" /></p>')
    }
    reader.readAsDataURL(f)
    $('#output').append('<p>' + f.name + ',<br />' + (f.type || 'n/a') + ',<br />' + f.size + 'bytes,<br />last modified: ' + f.lastModifiedDate.toLocaleDateString() + '</p>' 
    )
  })

  //function check support
  function checkSupport() {
    var pass = true
    $.each(support, function(key, value) {
      console.log(key.toString())
      log(key + ' : ' + '<i class="' + (value?'color-green':'color-red') + '">' + value + '</i>')
      if(!value) pass = false
    })
    if(!pass) log('your browser do not have full support for this app, try latest chrome, firfox instead.', 'color-red')
    else log('all pass, you browser are good to go.', 'color-green')
    return pass
  }

  function log(msg, cls, wrap) {
    (wrap || $('#log')).append('<p class="' + (cls || '') + '">' + msg + '</p>')
  }

	//js end
})