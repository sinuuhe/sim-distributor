/**
 * List all items of an entity
 * @param req Request object
 * @param res Response object
 * @param entity Entity
 * @param grant Grant that will be validate
 */

exports.index = (res, entity) => {
    entity.model.get((err, results) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: entity.messages.success.retrieved,
            data: results
        });
    });
};

/**
 * Retrieves an specific element
 * @param req Request object
 * @param res Response object
 * @param entity Entity
 * @param grant Grant that will be validate
 */
exports.view = (req, res, entity) => {
    entity.model.findById(req.params.id, (err, result) => {
        if (err)
            res.send(err);
        res.json({
            message: entity.messages.success.retrieved,
            data: result
        });
    });

};

/**
 * Creates a new object of an entity
 * @param req Request object
 * @param res Response object
 * @param entity Entity
 * @param grant Grant that will be validate
 */
exports.new = (req, res, entity) => {
    let newEntity = new entity.model();

    entity.properties.forEach(prop => {
        newEntity[prop] = req.body[prop]
    });

    newEntity['active'] = true;
    newEntity.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: entity.messages.success.created,
                data: newEntity
            });
        }
    });
};

/**
 * Updates an object
 * @param req Request object
 * @param res Response object
 * @param entity Entity
 * @param grant Grant that will be validate
 */
exports.update = (req, res, entity) => {
    entity.model.findById(req.params.id, (err, currentEntity) => {
        if (err)
            res.send(err);

        entity.properties.forEach(prop => {
            currentEntity[prop] !== req.body[prop] && req.body[prop] !== undefined ? currentEntity[prop] = req.body[prop] : currentEntity[prop] = currentEntity[prop];
        });

        // save the category and check for errors
        currentEntity.save((err) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    message: entity.messages.success.updated,
                    data: currentEntity
                });
            }
        });
    });
}

/**
 * Deletes an object
 * @param req Request object
 * @param res Response object
 * @param entity Entity
 * @param grant Grant that will be validate
 */
exports.delete = (req,res, entity) => {
    entity.model.remove({
        _id: req.params.id
    }, function (err, deletedEntity) {
        if (err)
            res.send(err);
        res.json({
            message: entity.messages.success.deleted
        });
    });
}