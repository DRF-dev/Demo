const form = document.getElementById('form')
const input = document.getElementById('message_input')
const messageZone = document.getElementById('messages')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const actualValue = input.value
  const date = new Date()

  let newMessage = document.createElement('div')
  newMessage.className = "user-infos"

  let content = document.createElement('li')
  content.className = "user"
  content.textContent = actualValue

  let hour = document.createElement('span')
  hour.className = "date-message"
  hour.textContent = `${date.getDate() < 10? `0${date.getDate()}`:date.getDate()}/${date.getMonth() < 10? `0${date.getMonth()}`:date.getMonth()}/${date.getFullYear()} ${date.getHours()}h${date.getMinutes() < 10? `0${date.getMinutes()}`:date.getMinutes()}`

  newMessage.appendChild(content)
  newMessage.appendChild(hour)
  messageZone.appendChild(newMessage)

  input.value = ""
})