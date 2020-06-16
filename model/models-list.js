const Distributor = require('./distributor-model');
const User = require('./user-model');
const _messages = require('../utils/messages');

exports.list = {
    distributor: {
        model: Distributor,
        properties: [
            'active',
            'name',
            'email',
            'phone_number',
            'sims',
            'register_date',
            'registered_by',
            'city'
        ],
        messages: _messages.messages.distributor
    },
    user: {
        model: User,
        properties: [
            'active',
            'name',
            'password',
            'email',
            'type'
        ],
        messages: _messages.messages.user
    }
}