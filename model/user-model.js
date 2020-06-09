var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
    active: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
});

// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = (callback, limit) => {
    User.find(callback).limit(limit);
}