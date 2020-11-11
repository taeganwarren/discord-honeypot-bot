# discord-honeypot-bot

Simple honeypot discord bot written with discord.js 11.6.4 and node.js

Waits for direct messages and upon recieving one, starts collecting all additional messages in the direct message channel for 10 seconds, resetting everytime an additional message is recieved.

After the timer runs out, creates an embed with the username of the user who sent the direct message(s) and all the message(s) they sent. Then sends the embed to the text channel provided by the `CHANNEL` variable in the `.env` file.

This bot, as is, is meant to be self hosted and run on only a single server, with preferably a staff channel given as the channel to send embed to.

This bot will not be updated to run on discord.js versions higher than 11.6.4 as this version of discord.js allows the bot to login to a normal user account instead of a bot account.

---

**.env file variables:**

`TOKEN`: The account token to login with. Either a user account token or bot account token.

`GUILD`: The guild ID of the server the bot should run in.

`CHANNEL`: The channel ID of the channel the bot should send embeds to. Must be a channel in the provided guild.
