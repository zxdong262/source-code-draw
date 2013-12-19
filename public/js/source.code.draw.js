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
  ,imgW = 0
  ,imgH = 0

  if(!checkSupport()) return

  $('#workspace').removeClass('hide')

	//events handler
	$('#file').on('change', function (evt) {
    var f = evt.target.files[0]
    ,reader = new FileReader()
    ,output = ''

    reader.onload = function(e) {
      var data = e.target.result
      log('preview image:')
      log('<p><img id="img" width="50" alt="' + f.name + '" title="' + f.name + '" src="' + data + '" /></p>')
      imgW = $('#img').width()
      imgH = $('#img').height()
      log('image with:' + imgW)
      log('image height:' + imgH)
      renderSourceCodeImg({
        scale: 0.5
        ,indent: ' '
      })
    }
    reader.readAsDataURL(f)
    log('output img info:')
    log('name: <i class="color-blue">' + f.name + '</i>')
    log('type: <i class="color-blue">' + (f.type || 'n/a') + '</i>')
    log('last modified: <i class="color-blue">' + f.lastModifiedDate.toLocaleDateString() + '</i>')
    if(f.type !== 'image/png') log('warning: looks like the image is not a png, may not work at all', 'color-red')
    $('#file-op').hide()
  })

  //function check support
  function checkSupport() {
    var pass = true
    $.each(support, function(key, value) {
      log(key + ' support: ' + '<i class="' + (value?'color-green':'color-red') + '">' + value + '</i>')
      if(!value) pass = false
    })
    if(!pass) log('your browser do not have full support for this app, try latest chrome, firfox instead.', 'color-red')
    else log('all pass, you browser are good to go.', 'color-green')
    return pass
  }

  //render text img
  function renderSourceCodeImg(opts) {
    $('#canvas').prop({
      width: imgW
      ,height: imgH
    })
    var ctx = canvas.getContext("2d")
    ,imgData
    ,arr = []
    ,i = 0
    ,len = 0
    ,defaults = $.extend({
      chars: '0123456789abcdefghijkmnlopqrstuvwxyz$#@!%^&*()_+'.split('')
      ,indent: '        '//8 space indent
    }, opts)
    ,lenChar = defaults.chars.length
    ,r
    ,t1 = 0
    ,t2 = 0
    ,ht = ''
    ,indent = defaults.indent
    ht += indent

    ctx.clearRect(0, 0, imgW, imgH)

    log('draw it in canvas.')
    ctx.drawImage($('#img')[0],0,0)

    log('getImageData.')
    imgData = ctx.getImageData(0, 0, imgW, imgH)
    arr = imgData.data
    len = arr.length

    log('processing.')
    t1 = new Date().getTime()

    for(;i < len;i += 4) {
      r = Math.floor(Math.random() * lenChar)
      if(!arr[i] && !arr[i+1] && !arr[i+2] && !arr[i+3]) ht += '  '
      else ht += defaults.chars[r] + ' '
      if(i % (4*imgW) === 0) ht += '\n' + indent
    }
    log('done.')

    t2 = new Date().getTime()
    log('time cost: <i class="color-red">' + (t2-t1) + '</i> ms')
    $('#output').html(ht)
  }

  //simple log
  function log(msg, cls, wrap) {
    (wrap || $('#log')).append('<p class="' + (cls || '') + '">' + msg + '</p>')
  }

	//js end
})