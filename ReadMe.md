# What is this bot about?

This bot is about leveling system. VC levels and Text levels are included.

# What packages do I need to run this bot without errors?

I've got you covered! Use the following command in the terminal in your root directory:

                                npm i discord.js@13 ms

# What are VC Levels and Text Levels?

VC levels are the levels that are rewarded when the user spends a certain time in voice channels.
Text Levels are the levels that are rewarded when the user sends messages in text channels.

# How do users obtain Levels?

Users can obtain levels in the following ways:

    For VC Levels:
    For every 5 seconds a user has been in vc, they get 1 point of EXP. The EXP reward is calculated from the moment the user joins vc until the moment the user leaves the vc. This is called one session. Since the EXP reward is calculated after each session, the Levels are also calculated after the session ends.
    The Base EXP by default needed to reach Level 1 from Level 0 is 30 EXP and increases by 120% of the previous Level's EXP. You can customize it according to your own needs in this file: ./utilities/expForNextLevel

    For Text Levels:
    For every message every 5 seconds, the user is rewarded EXP randomly between 5 to 20. Unlike VC Levels, the EXP is rewarded after every sucessful message.
    The Levels are also calculated the moment a Level threshold is reached.
    The Base EXP by default needed to reach Level 1 from Level 0 is 80 EXP and increases by 130% of the previous Level's EXP. You can customize it according to your own needs in this file: ./utilities/expForNextMsgLevel

# Where is the Data stored?

The Data is stored in a JSON file located here: ./utilities/userActivityData.json

# Why is the Data stored in JSON?

The Data is stored in JSON because I am a dumb coder and I don't understand the Schema stuff for mongodb and other dbs.
So to make it easier for me, I used JSON to store the values to make it easier for my dumb self and for you all maybe.

# What can I and can't edit?

Here are the things that you can and can't edit:

    You can edit:
        1. All the text that is inside ``,
        2. status and type in ./events/ready.js
    
    You can't edit:
        1. index.js,
        2. All files inside (i.) events folder (ii.) error handlers folder (iii.) utilities folder | Unless there are comments stating that you can customize it,
        3. The code inside files in the commands folder.

# Who created the bot and why?

This bot is created by "bunny_frost" (discord). The reason? Perhaps because I wanted to have a custom bot for myself and didn't find a lot of open source bots online.

# Want to Contribute?

I'm always open to contributions! If you have a bug fix, new feature, or any other kind of improvement, feel free to submit a pull request on GitHub. If you're new to all this, don't hesitate to ask questions

# Licensing and Usage:

This bot is absolutely free to use, and always will be. All I ask is that you respect the terms of the license (if any) and give credit where it's due. Also, if you do end up using it or forking it for your project, shoot me a message on Discord! I'd love to see how it's being used and the cool places it ends up.

# Closing Thoughts:

Building this bot was nothing short of fun and headaches when some error came up, and that sweet, sweet feeling when the code finally works. Thanks for reading all the way or maybe just skipping to this section. Have a great time botting!

bunny_frost