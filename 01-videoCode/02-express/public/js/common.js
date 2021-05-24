
$.ajax({
  url: '/api/list',
  success(result) {
    // 1.客户端渲染的字符串方法
    // let html = `<ul>`
    // $.each(result.data, (index, value) => {
    //   html += `<li>${value}</li>`
    // })
    // html += `</ul>`

    // 2.客户端渲染的模板方法
    // 这个东西不要太像啊,vue里面的template啊
    // const html = template.render('<div>{{ data }}</div>', { data: 100 })
    // 底下的each 是一个循环
    let templateStr = `
      <ul>
        {{each data}}
          <li>{{$value}}</li>
        {{/each}}
      </ul>
    `
    const html = template.render(templateStr, {
      data: result.data
    })
    $('#list').html(html)
  }
})
console.log('hello js');