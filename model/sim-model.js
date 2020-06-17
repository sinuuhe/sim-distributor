var mongoose = require('mongoose');

// Setup schema
var simSchema = mongoose.Schema({
  active: {
    type: Boolean,
    required: false
  },
  serial_number: {
    type: String,
    required: false
  },
  activation_date: {
    type: Date,
    required: false
  },
  phone_number: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    required: true
  },
  registered_by: {
    type: Object,
    required: true
  },
  distributor_id: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

// Export Sim model
var Sim = module.exports = mongoose.model('sim', simSchema);
module.exports.get = (callback, limit) => {
    Sim.find(callback).limit(limit);
}