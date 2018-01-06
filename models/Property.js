const mongoose = require('mongoose');
const { Schema } = mongoose;

const  PropertySchema = new Schema({
    propertyId: {type: String, default: ''},
    propertyBy: {type: Schema.Types.ObjectId, ref: 'users'},
    title: {type: String, default: ''},
    city: {type: String, trim:true, lowercase:true,  default: ''},
    street: {type: String, trim:true, lowercase:true,  default: ''},
    zipcode: {type: String, default: ''},
    sizeM2: {type: String, default: ''},
    floor: {type: String, default: ''},
    type: {type: String, default: ''},
    status: {type: String, default: ''},
    description: {type: String, default: ''},
    numRooms: {type: String, default: ''},
    pictures: {type:Array, default:[]},
    montlyPrice: {type: String, default: ''},
    totalPrice: {type: String, default: ''},
    deposit: {type: String, default: ''},
    approved: {type: Boolean, default: false},
    reserved: {type: Boolean, default: false},
    shareable: {type: Boolean, default: false},
    furnished: {type: String, default: ''},
    availableFrom: {type: String, default: ''},
    aconto: {type: String, default: ''},
    energyRating: {type: String, default: ''},
    animals: {type: String, default: ''},
    prePaidRental: {type: String, default: ''},
    rentalPeriod: {type: String, default: ''},
    moveDate: {type: String, default: ''},
    caseNumber: {type: String, default: ''},
    bedRooms: {type: String, default: ''},
    bathrooms: {type: String, default: ''},
    propertyYear: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now}

});

PropertySchema.methods.summary = function(){
  const summary  = {
      propertyId: this.propertyId,
      propertyBy: this.propertyBy,
      title: this.title,
      city: this.city,
      street: this.street,
      zipcode: this.zipcode,
      sizeM2: this.sizeM2,
      floor: this.floor,
      type: this.type,
      status: this.status,
      description: this.description,
      numRooms: this.numRooms,
      pictures: this.cityName,
      montlyPrice: this.montlyPrice,
      totalPrice: this.totalPrice,
      deposit: this.deposit,
      approved: this.approved,
      furnished: this.furnished,
      reserved: this.reserved,
      shareable: this.shareable,
      availableFrom: this.availableFrom,
      aconto: this.aconto,
      energyRating: this.energyRating,
      animals: this.animals,
      rentalPeriod: this.rentalPeriod,
      moveDate: this.moveDate,
      prePaidRental: this.prePaidRental,
      caseNumber: this.caseNumber,
      bedRooms: this.bedRooms,
      bathrooms: this.bathrooms,
      propertyYear: this.propertyYear,
      facebookId: this.facebookId,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

mongoose.model('property', PropertySchema)
