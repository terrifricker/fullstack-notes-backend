const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fricker-fullstack-notes.oafm7os.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fricker-fullstack-notes`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'This time I see the result.',
  important: false,
})

/* note.save().then(result => {
  console.log('note saved!')
  console.log(result)
  mongoose.connection.close()
}) */

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})