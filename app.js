//constant to import fs function
const fs = require('fs')

//Using fs function to write to the file
fs.writeFileSync('notes.txt', 'This file was created by Node.js.')
fs.writeFileSync('myname.txt', 'My name is Lucas Luo.')

//Challenge: Append a message to notes.txt
fs.appendFileSync('notes.txt', 'This is appended data!')

//Using console to output
const add = require('./utils.js')
const sum = add(4, -2)

console.log(sum)

//Challenge: Using module.exports
const notes = require('./notes.js')
const myNotes = notes()

console.log(myNotes)

//Using npm validator
const validator = require('validator')

console.log(validator.isEmail('luoz@appstate.edu'))
console.log(validator.isURL('https/www.npmjs.com'))

// Challenge
const chalk = require('chalk')
const log = console.log

log(chalk.red.inverse('Hello ') + 'World' + chalk.green.bold('!'))

//Get user input
console.log(process.argv[2])

const command = process.argv[2]

if (command === 'add') {
    console.log('Adding note!')
}
else if (command === 'remove') {
    console.log('Removing note!')
}

//Yargs
const yargs = require('yargs')

//add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function() {
        console.log('Adding a new note!')
    }
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing the note')
    }
})

//list command
yargs.command({
    command: 'list',
    describe: 'Listing all the note(s)',
    handler: function() {
        console.log('Listing all the note(s)')
    }
})

//read command
yargs.command({
    command: 'read',
    describe: 'Reading the note',
    handler: function() {
        console.log('Reading the note')
    }
})

console.log(yargs.argv)