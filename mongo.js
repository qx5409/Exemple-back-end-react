const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://phonebook_backend:${password}@phonebookcluster.90qtj.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] === "all"){
    let persons = [
        { 
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]
    Person.insertMany(persons)
    .then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
} else if (process.argv.length > 3){
    const person = new Person({ 
        "id": 5,
        "name": process.argv[3],
        "number": process.argv[4]
    })
    
    person.save().then(result => {
      console.log('person saved!')
      mongoose.connection.close()
    })
    
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
} else {
    Person.find({}).then(result => {
        console.log("phonebook :");
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close()
    })
}
