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
var simController = require('./controller/sim-controller');

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

router.put('/distributors/updateSims/:id', userController.verifyToken, distributorController.updateSims);
router.get('/distributors/:id', userController.verifyToken, distributorController.view);
router.patch('/distributors/:id', userController.verifyToken, distributorController.update);
router.put('/distributors/:id', userController.verifyToken, distributorController.update);
router.delete('/distributors/:id', userController.verifyToken, distributorController.delete);

router.get('/getSims', userController.verifyToken, distributorController.getSims);
router.get('/getSims/:id', userController.verifyToken, distributorController.getSims);

// Sims routes
router.get('/sims', userController.verifyToken, simController.index)

router.get('/sims/distributor/:id', userController.verifyToken, simController.getSimsByDistributorId);
router.put('/sims/:id', userController.verifyToken, simController.update);
router.put('/sims/phone/:phone', userController.verifyToken, simController.updatePhone);
router.post('/sims/push/:id', userController.verifyToken, simController.pushSims);
router.delete('/sims/clear/:id', userController.verifyToken, simController.clearSims);

// Export API routes
module.exports = router;