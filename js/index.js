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
  weather: 0,
  dice: 0,
  citation: 0
}

const rgxVerify = {
  hour: /hour/,
  date: /date/,
  day: /day/,
  weather: /weather/,
  dice: /dice/,
  citation: /citation/
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

const aleaNumber = (array) => {
  return Math.floor(Math.random() * Math.floor(array.length))
}

bodyMessageForBot('Hi and welcome to Chat-Bot PLOP. To see the commande please type "help". Hope you enjoy it :D' , "bot")

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = newMessage(e)

  if (rgxVerify.hour.test(inputValue)) {
    bodyMessageForBot(`It is ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`, "botForHour")
    numberNotif.hour++
    notifBot[0].textContent = numberNotif.hour
  }
  if(rgxVerify.date.test(inputValue) || rgxVerify.day.test(inputValue)) {
    bodyMessageForBot(`Today is the ${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear}`, "botForHour")
    numberNotif.date++
    notifBot[1].textContent = numberNotif.date
  }
  if(rgxVerify.dice.test(inputValue)) {
    bodyMessageForBot(`The number of dice is ${rollDice()}`, "botForDice")
    numberNotif.dice++
    notifBot[2].textContent = numberNotif.dice
  }
  if (rgxVerify.weather.test(inputValue)) {
    const arrayWeather = ['sunny', 'raining', 'foggy']
    let alea = aleaNumber(arrayWeather)
    bodyMessageForBot(`Today it is ${arrayWeather[alea]}`, "botForWeather")
    numberNotif.weather++
    notifBot[3].textContent = numberNotif.weather
  }
  if (rgxVerify.citation.test(inputValue)) {
    const arrayCitations = [
      "Les deux principales inventions sorties de Berkeley sont UNIX et le LSD. Difficile de croire à une quelconque coïncidence — Jeremy S. Anderson",
      "Si debugger, c’est supprimer des bugs, alors programmer ne peut être que les ajouter — Edsger Dijkstra",
      "Un ordinateur vous permet de faire plus de bêtises, beaucoup plus rapidement, que n’importe quelle autre invention dans l’histoire de l’humanité. À l’exception notable des armes à feu et de la tequila — Mitch Ratcliffe",
      "Vous ne pouvez pas comprendre la récursivité sans avoir d’abord compris la récursivité — Auteur Inconnu",
      "Quelle prétention de prétendre que l'informatique est récente : Adam et Eve avaient déjà un Apple ! - Auteur Inconnu",
      "Cookie : Anciennement petit gâteau sucré, qu'on acceptait avec plaisir. Aujourd'hui : petit fichier informatique drôlement salé, qu'il faut refuser avec véhémence. — Luc Fayard",
      "Linux s'apprête à devenir grand mais, hey, qui suis-je pour le dire ? - Linus Torvald"
    ]
    let alea = aleaNumber(arrayCitations)
    bodyMessageForBot(arrayCitations[alea], "botForCitations")
    numberNotif.citation++
    notifBot[4].textContent = numberNotif.citation
  }

  messageZone.scrollTop = messageZone.scrollHeight
})