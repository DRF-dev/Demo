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
  citation: 0,
  help: 0,
  tryMe: 0,
  map: 0
}

const rgxVerify = {
  hour: /\b(hour)\b/i,
  date: /\b(date)\b/i,
  day: /\b(day)\b/i,
  weather: /\b(weather)\b/i,
  dice: /\b(dice)\b/i,
  citation: /\b(citation)\b/i,
  help: /\b(help)\b/i,
  tryMe: /\b(tryMe)\b/i,
  map: /\b(map)\b/
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
  botMsg.innerHTML = (message).toString()

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

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = newMessage(e)

  if (rgxVerify.hour.test(inputValue)) {
    bodyMessageForBot(`It is ${getHour}h${getMinute < 10? `0${getMinute}`:getMinute}`, "botForHour")
    notifBot[0].textContent = ++numberNotif.hour
  }
  if(rgxVerify.date.test(inputValue) || rgxVerify.day.test(inputValue)) {
    bodyMessageForBot(`Today is the ${getDay < 10? `0${getDay}`:getDay}/${getMonth < 9? `0${getMonth+1}`:getMonth+1}/${getYear}`, "botForHour")
    notifBot[1].textContent = ++numberNotif.date
  }
  if(rgxVerify.dice.test(inputValue)) {
    bodyMessageForBot(`The number of dice is ${rollDice()}`, "botForDice")
    notifBot[2].textContent = ++numberNotif.dice
  }
  if (rgxVerify.weather.test(inputValue)) {
    const arrayWeather = ['sunny', 'raining', 'foggy']
    let alea = aleaNumber(arrayWeather)
    bodyMessageForBot(`Today it is ${arrayWeather[alea]}`, "botForWeather")
    notifBot[3].textContent = ++numberNotif.weather
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
    notifBot[4].textContent = ++numberNotif.citation
  }
  if (rgxVerify.help.test(inputValue)) {
    bodyMessageForBot(`<ul><p>The commands :</p>
    <li> * "help" for help</li>
    <li> * "hour" to have the current time</li>
    <li> * "date" or "day" to have today's date</li>
    <li> * "weather" to have a random weather</li>
    <li> * "dice" to have a random number betweedayn 1 and 6</li>
    <li> * "citation" to have a random quote</li>
    <li> * "map <name_of_city>" to open google map with the localisation of the city</li>
    <li> * "tryme" to have a surprise </li>
    </ul>`, "botForHelp")
    notifBot[5].textContent = ++numberNotif.citation
  }
  if (rgxVerify.map.test(inputValue)) {
    const city = inputValue.split(" ")[1]
    setTimeout(()=>{
      window.open(`https://www.google.fr/maps/place/${city}`, "_blank")
    }, 750)
    bodyMessageForBot(`Google map has been open on the city : ${city}`, "botForCity")
    notifBot[6].textContent = ++numberNotif.map
  }
  if (rgxVerify.tryMe.test(inputValue)) {
    bodyMessageForBot("You've been trolled", "botOfLife")
    setTimeout(()=>{
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    }, 750)
    notifBot[7].textContent = ++numberNotif.tryMe
  }


  messageZone.scrollTop = messageZone.scrollHeight
})

bodyMessageForBot('Hi and welcome to Chat-Bot PLOP. To see the commande please type "help". Hope you enjoy it :D' , "bot")