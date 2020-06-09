const userTypes = require('../utils/validations/user-types');
const models = require('../model/models-list');
const baseController = require('./base-controller');
const userValidator = require('../utils/validations/user-validator');
const ObjectId = require('mongoose').Types.ObjectId;

// Handle index actions
exports.index = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.user)
        .then(response => {
            if (response) {
                baseController.index(res, models.list.distributor);
            }
        })    
};

// Handle create distributor actions
exports.new = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.user)
    .then(response => {
        if (response) {
            baseController.new(req, res, models.list.distributor);
        }
    })  
};

// Handle view distributor info
exports.view = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.user)
    .then(response => {
        if (response) {
            baseController.view(req, res, models.list.distributor);
        }
    })
};

// Handle update distributor info
exports.update = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.admin)
    .then(response => {
        if (response) {
            baseController.update(req, res, models.list.distributor);
        }
    })
};

// Handle delete distributor
exports.delete = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.admin)
    .then(response => {
        if (response) {
            baseController.delete(req, res, models.list.distributor);
        }
    })
};

exports.pushSims = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.admin)
    .then(response => {
        if (response) {
            models.list.distributor.model.findById(req.params.id, (error, distributor) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }

                if (distributor.sims === undefined) {
                    distributor.sims = [];
                }
                createIdsForSims(req.body.sims)
                    .then(response => {
                        if (response !== undefined) {
                            let newSimsArray = distributor.sims.concat(response);
                            distributor.sims = newSimsArray;
                            distributor.save((error) => {
                                if (error) {
                                    res.json(error);
                                } else {
                                    res.json({
                                        message: models.list.distributor.messages.success.simsUpdated,
                                        data: distributor
                                    });
                                }
                            });
                        } else {
                            res.json(models.list.distributor.messages.error.couldNotCreateIds)
                        }
                    });
            }); 
        }
    })  
}

exports.clearSims = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.admin)
    .then(response => {
        if (response) {
            models.list.distributor.model.findById(req.params.id, (error, distributor) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: err,
                    })
                } else {
                    distributor.sims = [];

                    distributor.save(error => {
                        if (error) {
                            res.json(error);
                        } else {
                            res.json({
                                message: models.list.distributor.messages.success.simsCleared,
                                data: distributor
                            })
                        }
                    });
                }
            });
        }
    })  
};

exports.updateSims = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.admin)
    .then(response => {
        if (response) {
            models.list.distributor.model.findById(req.params.id, (error, distributor) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: err,
                    })
                } else {
                    distributor.sims = req.body.sims;

                    distributor.save(error => {
                        if (error) {
                            res.json(error);
                        } else {
                            res.json({
                                message: models.list.distributor.messages.success.simsUpdated,
                                data: distributor
                            })
                        }
                    });
                }
            });
        }
    })  
};

function createIdsForSims(sims) {
    let promise = new Promise((resolve, reject) => {
        sims.forEach(sim => {
            sim['_id'] = new ObjectId();
        });

        resolve(sims)
    });

    return promise;
}