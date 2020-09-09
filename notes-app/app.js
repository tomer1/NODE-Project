const notes = require("./notes.js");
const yargs = require("yargs");
const chalk = require("chalk");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
    console.log(
      "Adding a new note! title is: " + argv.title,
      "description is:" + argv.body
    );
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
    console.log("Removing the note");
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    console.log(chalk.green("Listing out all notes"));
    const listNotes = notes.listNotes();
    listNotes.forEach((element) => {
      console.log(chalk.yellow(element.title));
    });
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
