# WhatsApp-Personal-Assistant
WhatsApp Personal Assistant is Firefox plugin that performs some of the very basic activity of a personal assistant. It reads your messages and sets reminders, or sends a message back for simple messages.

Don't worry, it doesn't send your messages anywhere. Any message 'read' is not stored anywhere.
There is a backend php-python program that sets the reminder, which is localhost.

This was a collaboration with 
https://github.com/aravindmj97
https://github.com/crzyguy5869
and Arjun Manu
for Dhishna 2019 Hackathon called 'Make-A-Ton' on 19th January 2019

This is at a very simple beginning phase.

Currently :
It sets remiders when messages include the "remind me to xyz at xx.yy" structure
It replies to Happy Birthday and Congratulations.

Its pretty basic. Made in less than a day.

How it works:
It scraps the whatsapp web interface, and simulates mouse events.
In its current stage of development, It wouldn't work if whatsapp web changes its interface layout.
