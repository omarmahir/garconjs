var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
var request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */
 
var discord = require("discord.js");
var client = new discord.Client();
 
 
// Login into discord using bot token (do not share token with anyone!).
client.login("Njc2NTQ4OTU5MDQ4ODI2ODk2.XkIDhw.SwMQuOrbW8_U6XCsTNcx1jH0e7I");
 
client.on("ready", function() {
    console.log("logged in");
});
 
client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    /* Simple command manager */
    if (parts[0] === "!bghit") { // Check if first part of message is image command
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }

    if (parts[0] === "!jib") { // Check if first part of message is image command
 
        var cmd = parts.slice(1).join(" ");
        message.channel.send(cmd)

    }
 
});

client.on('guildMemberAdd', member => {
    
    
    const embed = {
        "description": "Mar7ba bik # kolchi 3la 7sabna \n li bghitiha gol lkalima si7riya  ```\n!bghit```",
        "url": "https://discordapp.com",
        "color": 13921806,
        "timestamp": "2020-02-11T02:04:42.602Z",
        "footer": {
          "icon_url": "https://cdn.discordapp.com/attachments/658879571520913408/666277021311041547/3.0.png"
        },
        "thumbnail": {
          "url": "https://cdn.discordapp.com/attachments/658879571520913408/666277021311041547/3.0.png"
        },
        "author": {
          "name": "Mol L9ahwa",
          "url": "https://discordapp.com",
          "icon_url": "https://cdn.discordapp.com/attachments/658879571520913408/666277021311041547/3.0.png"
        }
      };
    member.guild.channels.get('665990171937996840').send({embed});
})
 
function image(message, parts) {
 
    /* extract search query from message */
 
    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
 
        /* Extract image URLs from responseBody using cheerio */
 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            // Handle no results
            return;
        }
 
        // Send result
        message.channel.send({files: [urls[0]]});
    });
 
}