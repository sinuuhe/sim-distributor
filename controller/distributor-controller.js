const userTypes = require('../utils/validations/user-types');
const models = require('../model/models-list');
const baseController = require('./base-controller');
const userValidator = require('../utils/validations/user-validator');
const jwt = require('jsonwebtoken');
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
            let newEntity = new models.list.distributor.model();

            models.list.distributor.properties.forEach(prop => {
                newEntity[prop] = req.body[prop]
            });
        
            newEntity['active'] = true;

            var decoded = jwt.decode(req.token, {complete: true});

            models.list.user.model.findById(decoded.payload._id, (error, user) => {
                if (error) {
                    res.json(models.list.distributor.messages.error.couldNotSaveDistributor)
                } else {
                    if (user !== null) {
                        newEntity['registered_by'] = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        };
                        newEntity.save((err) => {
                            if (err) {
                                res.json(err);
                            } else {
                                res.json({
                                    message: models.list.distributor.messages.success.created,
                                    data: newEntity
                                });
                            }
                        });
                    } else {
                        res.json(models.list.user.messages.error.userNotFound)
                    }
                }
            });
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

                let decoded = jwt.decode(req.token, {complete: true});

                models.list.user.model.findById(decoded.payload._id, (error, user) => {
                    if (error) {
                        res.json(error);
                    } else {
                        createIdsForSims(req.body.sims, user)
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

// Handle sims search
exports.getSims = (req, res) => {
    userValidator.validateUser(req.token, res, userTypes.admin)
    .then(response => {
        if (response) {
            if (req.params.id === undefined) {
                models.list.distributor.model.find({}, {'sims':1}, function (err, sims) {
                    if(err) {
                        res.json({meesasge: 'errorrrrr',err})
                    } else {
                        new Promise((resolve, reject) => {
                            let result = {
                                activatedSims: 0,
                                notActivatedSims: 0
                            };
                            sims.forEach(sim => {
                                sim.sims.forEach(_sim => {
                                    if (_sim.active === true) {
                                        result.activatedSims++;
                                    } else {
                                        result.notActivatedSims++;
                                    }
                                })
                            })
    
                            if (result.activatedSims === -1 && result.notActivatedSims === -1) {
                                reject(result);
                            } else {
                                resolve(result);
                            }
                        })
                            .then(result => {
                                res.json({
                                    message: models.list.distributor.messages.success.simsRetrieved,
                                    result
                                })
                            })
                            .catch(result => {
                                res.json(models.list.distributor.messages.error.couldNotGetSims)
                            })
                    }
                });
            } else {
                models.list.distributor.model.find({_id: ObjectId(req.params.id)}, {'sims':1}, function (err, sims) {
                    if(err) {
                        res.json({meesasge: 'errorrrrr',err})
                    } else {
                        new Promise((resolve, reject) => {
                            let result = {
                                activatedSims: 0,
                                notActivatedSims: 0
                            };
                            sims.forEach(sim => {
                                sim.sims.forEach(_sim => {
                                    if (_sim.active === true) {
                                        result.activatedSims++;
                                    } else {
                                        result.notActivatedSims++;
                                    }
                                })
                            })
    
                            if (result.activatedSims === -1 && result.notActivatedSims === -1) {
                                reject(result);
                            } else {
                                resolve(result);
                            }
                        })
                            .then(result => {
                                res.json({
                                    message: models.list.distributor.messages.success.simsRetrieved,
                                    result
                                })
                            })
                            .catch(result => {
                                res.json(models.list.distributor.messages.error.couldNotGetSims)
                            })
                    }
                });
            }
        }
    })
};

function createIdsForSims(sims, user) {
    let promise = new Promise((resolve, reject) => {
        sims.forEach(sim => {
            sim['registered_by'] = {
                name: user.name,
                email: user.email,
                _id: user.id
            };
            sim['_id'] = new ObjectId();
        });

        resolve(sims)
    });

    return promise;
}