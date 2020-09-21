const form = document.getElementById('form')
const input = document.getElementById('message_input')
const messageZone = document.getElementById('messages')

const date = new Date()
const getHour = date.getHours()
const getMinute = date.getMinutes()
const getDay = date.getDate()
const getMonth = date.getMonth()
const getYear = date.getFullYear()

const rgxVerifyHour = /hour/

const newMessage = () => {
  const actualValue = input.value
  if(!actualValue) return

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

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const newActValue = newMessage(e)

  if (rgxVerifyHour.test(newActValue)) {
  
    let responseHour = document.createElement('div')
    responseHour.className = "bot-infos"

    let botName = document.createElement('span')
    botName.className = "name"
    botName.textContent = "bot for hour"

    let botMsg = document.createElement('li')
    botMsg.className = "bot"
    botMsg.textContent = (`Il est ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`)

    let botMoment = document.createElement('span')
    botMoment.className = "date-message"
    botMoment.textContent = `${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear} ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`

    responseHour.appendChild(botName)
    responseHour.appendChild(botMsg)
    responseHour.appendChild(botMoment)

    messageZone.appendChild(responseHour)
  }

})