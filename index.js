const Discord = require('discord.js')
const api = require('./api.js')
const { prefix, token } = require('./config.json')

const client = new Discord.Client()

client.once('ready', () => {
  console.log('Ready')
})

client.on('message', message => {
  //console.log(message.content)
  if(message.content.startsWith(`${prefix}covid`)) {
    //message.channel.send("Eae")

    let command = message.content.split(`${prefix}covid `)[1]

    if (command.toUpperCase === 'ALL') {
      return
    }

    api.get(`/${command}`)
    .then(function (response) {
      const { data } = response

      if (data.error) {
        res = `Desculpe, não encontrei nenhuma informação para "${command}"`
      } else {
        res = `**Número de total de casos:** ${data.totalCases}\n` +
              `**Novos casos:** ${data.newCases}\n` +
              `**Número de mortes:** ${data.totalDeaths}\n` +
              `**Novas mortes:** ${data.newDeaths}\n` +
              `**Número de casos curados:** ${data.totalRecovered}\n` +
              `**Número de casos ativos:** ${data.activeCases}\n` +
              `**Número de casos críticos:** ${data.seriousCritical}\n` +
              `**Data de atualização:** ${data.lastUpdate}\n`
      }

      message.channel.send(res)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    
  }
})

client.login(token)