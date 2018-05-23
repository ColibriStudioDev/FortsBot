const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");







//parameter
var ShowChan = 'general'
var prefix = '!'
var role = []
var AdminRole = "Administrateur"
var OrganiRole = "Organisateur"

//event create
var Date = []
var ParticipatePlayer = []
var EventPlayer = []
var MaxPlayer = []
var EventName = []
var EventDescription = []
var EventGame = []
var IsCreating = false
var UserCreate
var phase = 0

bot.on('ready', function () {
    console.log("Je suis connecté !");
})

bot.login('NDQwODE4MzgyNjAyNzY0Mjk4.DcnfvA.g4rMmIFDQYtu34F0t_F7nkGUzQU');



bot.on('message', message => {
    /*
    if (message.content === 'ping') {
        var _channel = message.guild.channels.get(ShowChan)
        var _role = message.guild.roles.find('name', 'TestROle')
        _channel.send("")

    }
    if (message.content === 'role') {
        var _role = message.guild.roles.find('name', 'TestROle')
        message.member.addRole(_role)
    }
    */


    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //TEST
    if (message.content === prefix + "test") {
        message.channel.send("" + EventPlayer[EventPlayer.length - 1])


    }

    //EVENT JOIN
    if (command === "eventjoin") {
        _eventid = args.join(" ")
        _id = parseInt(_eventid)

        if (typeof _id === 'number') {
            if (typeof MaxPlayer[_id] !== NaN) {
                if (MaxPlayer[_id] > 0) {

                    
                    var _PlayerList = ParticipatePlayer[_id].split(",")
                    for (var _i = 0; _i < _PlayerList.length;_i++) {
                        if (_PlayerList[_i] == message.author.username) {
                            message.channel.send("You are already register to this event")
                            return
                        }
                    }
                    EventPlayer[_id].sendMessage("" + message.author.username + " participate to the event : " + EventName[_id])
                    ParticipatePlayer[_id] = ParticipatePlayer[_id] + message.author.username + ","
                    MaxPlayer[_id] -= 1
                    message.channel.send("You participate to this event")
                    message.delete()
                    return
                    
                }



            }


            else {
                message.channel.send("Sorry, this event is full")
                message.delete()
                return
            }


        }

        else {
            message.EventPlayer[_id].send(message.author + " rejoint l'event !")
            message.channel.send("You participate to this event")
            message.delete()
            return
        }


    }

    //SHOWCHAN CHANGE
    if (command === "ShowChan") {
        var _authorole = message.guild.roles.find("name", AdminRole)
        if (message.member.roles.find("name", AdminRole) === _authorole) {
            const _NewChan = args.join(" ")
            ShowChan = _NewChan
            message.channel.send("The channel name was changed succesfully.")
        }
        message.channel.send("Sorry you are not the administrator.")
    }

    //ADMINROLE CHANGE
    if (command === "admchg") {
        var _authorole = message.guild.roles.find("name", AdminRole)
        if (message.member.roles.find("name", AdminRole) === _authorole) {
            const _NewAdminRole = args.join(" ")
            AdminRole = _NewAdminRole
            message.delete()
            message.channel.send("The new Administrator role has been define sucessfully.")
        }
        else {

            message.channel.send("Sorry you are not the administrator.")
        }
    }

    //ORGAROLE CHANGE
    if (command === "OrgaChange") {
        var _authorole = message.guild.roles.find("name", AdminRole)
        if (message.member.roles.find("name", AdminRole) === _authorole) {
            const _NewOrgaRole = args.join(" ")
            OrganiRole = _NewAdminRole
            message.delete()
            message.channel.send("The new Organisator role has been define sucessfully.")
        }
        message.channel.send("Sorry you are not the administrator.")
    }

    //HELP COMMAND
    if (command === "help") {
        message.author.sendMessage(
            `
                User command : 
            !help  :  list of the commands
            !gamerolejoin NameofTheRole  :  Join a gamerole
            !gamerolequit NameOfTheRole  :  Quit a gamerole
            !eventjoin IDofTheEvent  :  join a event, take the event ID on the event channel
            
            Organisator command :
            !event create  :  create a new event NOTE : Please create only one event at the same time
            

            Admin command :
            !OrgaChange NameOfTheNewRole  :  change the organisator role
            !ShowCHan NameOfTheNewShowChan  :  Change the Event Show Channel
            
            `)
    }

    //ROLE JOIN
    if (command === "gamerolejoin") {
        const _roleStringAdd = args.join(" ")
        var _role = message.guild.roles.find("name", _roleStringAdd)

        if (_role == null) {
            message.channel.send("This role doesn't exist, please use a different word")
            return
        }

                message.member.addRole(_role)
                message.channel.send("The role was added succesfully")
    }

    //ROLE QUIT
    if (command === "gamerolequit") {
        const _roleStringAdd = args.join(" ")
        var _role = message.guild.roles.find("name", _roleStringAdd)

        if (_role == null) {
            message.channel.send("This role doesn't exist, please use a different word")
            return
        }

                message.member.removeRole(_role)
                message.channel.send("The role was removed succesfully")

    }

    //EVENT CREATE
    if (message.content === prefix + 'event create') {
        var _authorole = message.guild.roles.find("name", OrganiRole)
       
        if (message.member.roles.find("name", OrganiRole) === _authorole) {
            IsCreating = true
            UserCreate = message.author
            message.channel.send("Entrez le nom de l'event ->")
            phase = 1
            return
        } else {
            message.channel.send("You are not an organisator.")
        }
    }

    if (IsCreating === true) {
        var _tempID = ""
        if (message.author === UserCreate) {
            if (phase === 1) {
                EventName[EventName.length] = message.content
                message.channel.send("Entrez la description ->")
                phase = 2
                return
            }

            if (phase === 2) {
                EventDescription[EventDescription.length] = message.content
                message.channel.send("Entrez la date et/ou l'heure ->")
                phase = 3
                return
            }

            if (phase === 3) {
                Date[Date.length] = message.content
                message.channel.send("Entrez le nom du jeu concerne (Meme nom que le role en question)")
                phase = 4
                return
            }
            if (phase === 4) {
                var _gamerole = message.guild.roles.find('name', message.content)

                if (_gamerole == null) {
                message.channel.send("This role doesn't exist, please use a different word")
                return
                }
                        EventGame[EventGame.length] = _gamerole
                        message.channel.send("Entrez le nombre de player maximum ->")
                        phase = 5
                        return

                
            }
            if (phase === 5) {

                var _tempvalue = parseInt(message.content)
                MaxPlayer[MaxPlayer.length] = _tempvalue
                if (typeof MaxPlayer[MaxPlayer.length - 1] !== NaN) {
                    if (MaxPlayer[MaxPlayer.length - 1] == NaN) {
                        message.channel.send("Entrez une unique valeur numerique")
                        return
                    }


                    phase = 6
                    message.channel.send("Nom: " + EventName[EventName.length - 1])
                    message.channel.send("Description: " + EventDescription[EventDescription.length - 1])
                    message.channel.send("Max Player: " + MaxPlayer[MaxPlayer.length - 1])
                    message.channel.send("Date: " + Date[Date.length - 1])
                    message.channel.send("Game : " + EventGame[EventGame.length - 1].name)
                    message.channel.send("Confirmez vous la creation de cette event ? Entrez oui ou non ->")
                    return
                  }
                
                    message.channel.send("Entrez une unique valeur numerique")
                    return
                
               
            }
            if (phase === 6) {
                _tempID = EventName.length
                _tempID -= 1
                if (message.content === 'oui') {
                    message.channel.send("Nouvel event creer avec pour ID : " + _tempID)
                    var _channel = message.guild.channels.find("name", ShowChan)
                    EventPlayer[EventPlayer.length] = UserCreate;
                    ParticipatePlayer[ParticipatePlayer.length] = UserCreate.username + ","


                    _channel.send({
                        embed: {
                            color: 3447003,
                            author: {
                                name: UserCreate.username,
                                icon_url: UserCreate.avatarURL
                            },
                            title: "",


                            description: "",

                            fields: [
                                {
                                name: "" + EventName[EventName.length - 1],
                                value: "" + EventDescription[EventDescription.length - 1]

                            },
                            {
                                name: "Game : ",
                                value: "" + EventGame[EventGame.length - 1]

                            },
                            {
                                name: "Date",
                                value: "" + Date[Date.length - 1]

                            },
                            {
                                name: "Max Players",
                                value: "" + MaxPlayer[MaxPlayer.length - 1]

                            }
                            ],

                            footer: {

                                text: "ID : " + _tempID
                            }
                        }
                    })
                    _channel.send("" + EventGame[EventGame.length-1])


                    UserCreate = null
                    IsCreating = false
                    phase = 0
                }
                if (message.content === 'non') {
                    message.channel.send("Annulation de la creation de l'event...")
                    EventName.pop
                    EventDescription.pop
                    Date.pop
                    MaxPlayer.pop
                    message.channel.send("Event annule")
                    IsCreating = false
                    phase = 0
                }
                
                return

            }

        }
    }
})


function recap() {

  


}

function showevent() {


}
