// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', (req, res) => {
    res.json({
        status: 'Running',
        message: 'Hit an endpoint'
    });
});

// Import controllers
var distributorController = require('./controller/distributor-controller');
var userController = require('./controller/user-controller');

// User routes
router.get('/users', userController.verifyToken, userController.index)
router.post('/users', userController.verifyToken, userController.new);
router.post('/users/newUser', userController.verifyToken, userController.newUserWithoutAuthentication);

router.get('/users/:id', userController.verifyToken, userController.view);
router.patch('/users/:id', userController.verifyToken, userController.update);
router.put('/users/:id', userController.verifyToken, userController.update);
router.delete('/users/:id', userController.verifyToken, userController.delete);

router.post('/users/login',userController.login);

// Distributor routes

router.get('/distributors', userController.verifyToken, distributorController.index)
router.post('/distributors', userController.verifyToken, distributorController.new);

router.post('/distributors/pushSims/:id', userController.verifyToken, distributorController.pushSims);
router.post('/distributors/clearSims/:id', userController.verifyToken, distributorController.clearSims);
router.put('/distributors/updateSims/:id', userController.verifyToken, distributorController.updateSims);
router.get('/distributors/:id', userController.verifyToken, distributorController.view);
router.patch('/distributors/:id', userController.verifyToken, distributorController.update);
router.put('/distributors/:id', userController.verifyToken, distributorController.update);
router.delete('/distributors/:id', userController.verifyToken, distributorController.delete);

// Export API routes
module.exports = router;