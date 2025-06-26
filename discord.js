require('dotenv').config();  // Load environment variables from .env file

const { Client, Events, GatewayIntentBits, TextChannel } = require('discord.js');
const events = require('./events');

// Debug: Check if DISCORD_TOKEN and CHANNEL_ID are loaded
console.log("Discord Token loaded:", !!process.env.DISCORD_TOKEN);
console.log("Discord Channel ID:", process.env.CHANNEL_ID);

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Use token from .env file
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("Discord bot login initiated."))
    .catch((error) => {
        console.error("Failed to login:", error.message); // Log specific error if login fails
    });

// When the client is ready, run this code (only once).
const readyPromise = new Promise(resolve => {
    client.once(Events.ClientReady, async (readyClient) => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        resolve();
    });
});

/**
 * Sends a message to your guild channel by ID.
 * @param {string} text The message to send
 * @returns {Promise<Message>}
 */
async function sendToMyChannel(text) {
    await readyPromise;

    // Fetch the channel using environment variable
    const channel = await client.channels.fetch(process.env.CHANNEL_ID).catch(err => {
        throw new Error(`Failed to fetch channel: ${err.message}`);
    });

    // Ensure it’s a text-based channel
    if (!(channel instanceof TextChannel)) {
        throw new Error(`Channel ${process.env.CHANNEL_ID} is not a text channel.`);
    }

    // Send and return the resulting Promise
    return channel.send(text);
}

// EVENTS
client.on(Events.MessageCreate, message => {
    if (message.author.id === client.user.id) {
        return;
    }

    console.log("GOT MESSAGE: " + message.content + " AUTHOR: " + (message.member?.displayName ?? message.author.username));

    events.emit('discordMessage', {
        content: message.content,
        author: message.member?.displayName ?? message.author.username,
    });
});

module.exports = { sendToMyChannel };