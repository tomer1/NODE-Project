const fs = require("fs");
const { default: chalk } = require("chalk");

const getNotes = () => "Get Notes";

const removeNote = (title) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((n) => n.title !== title);

  if (duplicateNotes.length !== notes.length) {
    saveNotes(duplicateNotes);
    console.log("sucessfully remove item: ", title);
  } else {
    console.log("Note title was not found !");
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((n) => n.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note store");
  } else {
    console.log("Note title taken !");
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const listNotes = () => loadNotes();

const readNote = (title) => {
  const notes = loadNotes();
  const findNote = notes.find((note) => note.title === title);
  if (findNote) {
    console.log(
      chalk.inverse.greenBright(
        "find note title is: " + findNote.title + " body is: " + findNote.body
      )
    );
  } else {
    console.log(chalk.red("No note was found"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
