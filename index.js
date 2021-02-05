let data = []


const fs = require('fs')


function delay() {
  return new Promise(resolve => setTimeout(resolve, 300))
}


async function delayedLog(item) {
  await delay()
  request(
    { uri: item.link },
    function(error, response, body) {
      let beautifiedCode = body.replace(/[\x00-\x1F\x7F-\x9F]/g, "")
      let minutes = parseFloat(beautifiedCode.split('<p class="text-link text-footer">').pop().split('&nbsp;mins')[0])
    }
  )
}


async function processArray(array) {
  array.forEach(async (item) => {
    await delayedLog(item)
  })
}


processArray(data)