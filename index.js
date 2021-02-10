const fs = require('fs')
const request = require('request')


let inputData = JSON.parse(fs.readFileSync('assets/input.json'))
let films = inputData.filter(i => i.category == 'films')
let copy = [...films]


function delay() {
  return new Promise(resolve => setTimeout(resolve, 300))
}


async function delayedLog(item) {
  await delay()
  request(
    { uri: item.link },
    function(error, response, body) {
      if (error) return console.log(error, item)
      let beautifiedCode = body.replace(/[\x00-\x1F\x7F-\x9F]/g, "")
      let minutes = parseFloat(beautifiedCode.split('<p class="text-link text-footer">').pop().split('&nbsp;mins')[0])
      copy.filter(i => i.link == item.link)[0].filmDuration = minutes
    }
  )
}


async function processArray(array) {
  array.forEach(async (item) => {
    await delayedLog(item)
  })
}


//processArray(films)


for (let index = 0; index < copy.length; index++) {
  let inputMinutes = copy[index].filmDuration
  let inputHours = parseFloat((inputMinutes / 60).toFixed(1))

  let hours = parseFloat((inputHours + "").split(".")[0])
  let decimals = parseFloat((inputHours + "").split(".")[1]) / 10 * 60

  copy[index].durationHours = hours
  copy[index].durationMinutes = decimals

  delete copy[index].filmDuration
}


setTimeout(() => {
  jsonOutput = JSON.stringify(copy, null, 2) 

  fs.writeFile('assets/output.json', jsonOutput, function (err) {
    if (err) return console.log(err)
  })
}, 1000)