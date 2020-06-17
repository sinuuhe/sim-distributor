const Distributor = require('./distributor-model');
const User = require('./user-model');
const Sim = require('./sim-model');
const _messages = require('../utils/messages');

exports.list = {
    distributor: {
        model: Distributor,
        properties: [
            'active',
            'name',
            'email',
            'phone_number',
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
    },
    sim: {
        model: Sim,
        properties: [
            'active',
            'serial_number',
            'activation_date',
            'phone_number',
            'register_date',
            'registered_by',
            'distributor_id'
        ],
        messages: _messages.messages.sim
    }
}