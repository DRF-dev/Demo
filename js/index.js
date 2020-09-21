const form = document.getElementById('form')
const input = document.getElementById('message_input')
const messageZone = document.getElementById('messages')

const newMessage = (e) => {
  e.preventDefault()
  const actualValue = input.value
  const date = new Date()
  if(!actualValue) return

  let newMessage = document.createElement('div')
  newMessage.className = "user-infos"

  let content = document.createElement('li')
  content.className = "user"
  content.textContent = actualValue

  let hour = document.createElement('span')
  hour.className = "date-message"
  hour.textContent = `${date.getDate()< 10? `0${date.getDate()}`:date.getDate()}/${date.getMonth() < 9? `0${date.getMonth()+1}`:date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}h${date.getMinutes() < 10? `0${date.getMinutes()}`:date.getMinutes()}`

  newMessage.appendChild(content)
  newMessage.appendChild(hour)
  messageZone.appendChild(newMessage)

  input.value = ""
}

form.addEventListener('submit', (e) => {
  newMessage(e)
})