var mongoose = require('mongoose');

// Setup schema
var distributorSchema = mongoose.Schema({
    active: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: true
    },
    register_date: {
      type: Number,
      required: true
    },
    registered_by: {
      type: Object,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    sims: {
      type: Array,
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
      _id: {
        type: mongoose.Types.ObjectId,
        required: true
      }
    }
});

// Export Distributor model
var Distributor = module.exports = mongoose.model('distributor', distributorSchema);
module.exports.get = (callback, limit) => {
    Distributor.find(callback).limit(limit);
}