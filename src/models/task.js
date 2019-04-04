const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            value = parseInt(value)
            if(!isNaN(value)){ // check value
                throw new Error('Name cannot be number')
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    } 
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// TASKS
// - memiliki field description dan completed
//     - description: nama task yang akan dilakukan
//         - String
//         - Hapus spasi di awal dan di akhir
//         - Wajib diisi
//         - Tidak boleh number
//     - completed: status sudah dikerjakan atau belum (true, false)
//         - Boolean
//         - optional 
//         - default value: false