const bcrypt = require('bcryptjs')
const users = []

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body
    
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const existing = bcrypt.compareSync(password, users[i].passWrdHash)
        if (existing) {
          
          let userToReturn = {...users[i]}
          delete userToReturn.passWrdHash
          res.status(200).send(userToReturn)
        }
      }
    }
      res.status(400).send("User not found.")
  },
    register: (req, res) => {
        console.log('Registering User')
        
        
        



        const { username , firstName, lastName, email, password} = req.body
        const salt= bcrypt.genSaltSync(5)
        const passWrdHash = bcrypt.hashSync(password, salt)

        let userObj = {
        username,
        email,
        firstName,
        lastName,
        passWrdHash
      }
      users.push(userObj)
      let usersToReturn = {...userObj}
      delete usersToReturn.passWrdHash
      res.status(200).send(usersToReturn)
      
      console.log(userObj)




    } 
}