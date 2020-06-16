exports.messages = {
    user: {
        error: {
            loginError: {
                code: 1000,
                status: 'Error',
                message: 'Email or password invalid'
            },
            invalidUser: {
                code: 1001,
                status: 'Error',
                message: 'You don\'t have access to this info'
            },
            creatingUserError: {
                code: 1002,
                status: 'Error',
                message: 'Couldn\'t create user. Try later'
            },
            userAlreadyExists: {
                code: 1003,
                status: 'Error',
                message: 'email is already in use'
            },
            wrongUserType: {
                code: 1004,
                status: 'Error',
                message: 'Wrong user type'
            },    
            userNotFound: {
                code: 1005,
                status: 'Error',
                message: 'User not found'
            }
        },
        success: {
            userCreated: {
                code: 2000,
                status: 'success',
                message: 'New user created!'
            },
            login: {
                code: 2001,
                status: 'success',
                message: 'User logged in!'
            }
        }
    },
    distributor: {
        error: {
            couldNotCreateIds: {
                code: 1000,
                status: 'error',
                message: 'Couldn\'t store sims. Try again later'
            },
            couldNotSaveDistributor: {
                code: 1001,
                status: 'error',
                message: 'Couldn\'t save distributor. Try again later'
            },
            couldNotGetSims: {
                code: 1002,
                status: 'error',
                message: 'Couldn\'t get sims report. Try again later'
            }
        },
        success: {
            created: {
                code: 2000,
                status: 'success',
                message: 'Distributor created successfully'
            },
            retrieved: {
                code: 2001,
                status: 'success',
                message: 'Distributor(s) retrieved successfully' 
            },
            updated: {
                code: 2002,
                status: 'success',
                message: 'Distributor updated successfully' 
            },
            deleted: {
                code: 2003,
                status: 'success',
                message: 'Distributor deleted successfully' 
            },
            simsUpdated: {
                code: 2004,
                status: 'success',
                message: 'SIMs updated' 
            },
            simsCleared: {
                code: 2005,
                status: 'success',
                message: 'SIMs cleared' 
            },
            simsRetrieved: {
                code: 2006,
                status: 'success',
                message: 'SIMs retrieved' 
            }
        }
    }
}