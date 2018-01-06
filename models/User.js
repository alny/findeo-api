const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {type: String, default: ''},
    firstName: {type: String, trim:true, lowercase:true, default: ''},
    lastName: {type: String, default: ''},
    address: {type: String, trim:true, lowercase:true, default: ''},
    zipCode: {type: String, default: ''},
    city: {type: String, trim:true, lowercase:true, default: ''},
    country: {type: String, trim:true, lowercase:true,  default: ''},
    image: {type: String, default: ''},
    email: {type: String, trim:true, lowercase:true,  default: ''},
    phoneNumbers: {type:Array, default:[]},
    userId: {type:Number, default: ''},
    profileComplete: {type: Boolean, default: false},
    loginId: {type: String, default: ''},
    facebookId: {type: String, default: ''},
    validated: {type: Boolean, default: false},
    properties: [{type: Schema.Types.ObjectId, ref: 'PropertySchema'}],
    timestamp: {type: Date, default: Date.now}

});

UserSchema.methods.summary = function(){
  const summary  = {
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      zipCode: this.zipCode,
      city: this.city,
      country: this.country,
      image: this.image,
      email: this.email,
      phoneNumbers: this.phoneNumbers,
      userId: this.userId,
      loginId: this.loginId,
      profileComplete: this.profileComplete,
      facebookId: this.facebookId,
      validated: this.validateds,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

mongoose.model('users', UserSchema);
