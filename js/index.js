const form = document.getElementsByTagName('form')[0]
const input = document.getElementsByTagName('input')[0]
const messageZone = document.getElementsByTagName('ul')[1]

const date = new Date()
const getHour = date.getHours()
const getMinute = date.getMinutes()
const getDay = date.getDate()
const getMonth = date.getMonth()
const getYear = date.getFullYear()

const notifBot = document.getElementsByClassName('number_of_notif')
let numberNotif = {
  hour: 0,
  date: 0,
  dice: 0
}

const rgxVerifyHour = /hour/
const rgxVerifyDice = /dice/
const rgxVerifyDate = {
  date: /date/,
  day: /day/
}

const newMessage = () => {
  const actualValue = input.value
  if (!actualValue) return

  let newMessage = document.createElement('div')
  newMessage.className = "user-infos"

  let content = document.createElement('li')
  content.className = "user"
  content.textContent = actualValue

  let hour = document.createElement('span')
  hour.className = "date-message"
  hour.textContent = `${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear} ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`

  newMessage.appendChild(content)
  newMessage.appendChild(hour)
  messageZone.appendChild(newMessage)

  input.value = ""

  return actualValue
}

const bodyMessageForBot = (message, name) => {
  let responseHour = document.createElement('div')
  responseHour.className = "bot-infos"

  let botName = document.createElement('span')
  botName.className = "name"
  botName.textContent = (name).toString()

  let botMsg = document.createElement('li')
  botMsg.className = "bot"
  botMsg.textContent = (message).toString()

  let botMoment = document.createElement('span')
  botMoment.className = "date-message"
  botMoment.textContent = `${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear} ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`

  responseHour.appendChild(botName)
  responseHour.appendChild(botMsg)
  responseHour.appendChild(botMoment)

  messageZone.appendChild(responseHour)
}
const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1  
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = newMessage(e)

  if (rgxVerifyHour.test(inputValue)) {
    bodyMessageForBot(`It is ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`, "botForHour")
    numberNotif.hour++
    notifBot[0].textContent = numberNotif.hour
  } 
  if(rgxVerifyDate.date.test(inputValue) || rgxVerifyDate.day.test(inputValue)) {
    bodyMessageForBot(`Today is the ${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear}`, "botForDate")
    numberNotif.date++
    notifBot[1].textContent = numberNotif.date
  }
  if(rgxVerifyDice.test(inputValue)) {
    bodyMessageForBot(`The number of dice is ${rollDice()}`)
    numberNotif.dice++
    notifBot[2].textContent = numberNotif.dice
  }

  messageZone.scrollTop = messageZone.scrollHeight;
})