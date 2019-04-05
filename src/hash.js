const bcrypt = require('bcrypt')

// Encrypt password in Database
const hashing = async (password) => {

    const hashed = await bcrypt.hash(password, 8); // password akan dihash 8 kali (security)

    console.log(hashed);
    return hashed // data type: object => harus diganti ke string kalo ga error
    
}

const hashcheck = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hashed)

    if(!isMatch){
        return console.log('Not compatible');
        
    }
    console.log('Compatible');
    
}

const password = 'CucokMeyong2019'
const password2 = 'Ashiaap2018'


var hashed = hashing(password)

hashed = hashed.toString()

hashcheck(password, hashed)