const form = document.getElementById('form')
const input = document.getElementById('message_input')
const messageZone = document.getElementById('messages')

const date = new Date()
const getHour = date.getHours()
const getMinute = date.getMinutes()
const getDay = date.getDate()
const getMonth = date.getMonth()
const getYear = date.getFullYear()

const notifBotForHour = document.getElementsByClassName('number_of_notif')[0]
let numberNotifBotHour = 0;

const rgxVerifyHour = /hour/
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

const bodyMessageForBot = (message) => {
  let responseHour = document.createElement('div')
  responseHour.className = "bot-infos"

  let botName = document.createElement('span')
  botName.className = "name"
  botName.textContent = "botForHour"

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

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = newMessage(e)

  if (rgxVerifyHour.test(inputValue)) {
    bodyMessageForBot(`It is ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`)
    numberNotifBotHour++
    notifBotForHour.textContent = numberNotifBotHour
  } else if(rgxVerifyDate.date.test(inputValue) || rgxVerifyDate.day.test(inputValue)) {
    bodyMessageForBot(`Today is the ${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear}`)
    numberNotifBotHour++
    notifBotForHour.textContent = numberNotifBotHour
  }

  element = document.getElementById('messages');
  element.scrollTop = element.scrollHeight;
})