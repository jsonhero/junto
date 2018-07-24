import mongoose from 'mongoose'


const AccountSchema = new mongoose.Schema({
  username: String,
  password: String
})


export default mongoose.model('account', AccountSchema, 'accounts');
