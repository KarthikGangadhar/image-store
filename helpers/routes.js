'use strict';

const Joi = require('joi');
const Handlers = require('../lib/handlers');

const resultHTTPStatus = {
    '200': {
        'description': 'Success'
    },
    '400': {
        'description': 'Bad Request'
    },
    '404': {
        'description': 'Profile not found'
    },
    '500': {
        'description': 'Internal Server Error'
    }
};

module.exports = [{
    method: 'GET',
    path: '/storeImages',
    config: {
        handler: Handlers.storeImages,
        description: 'updates images of player within specified pid range',
        tags: ['api', 'reduced'],
        notes: ['updates images of player within specified pid range'],
        plugins: {
            'hapi-swagger': {
                responses: resultHTTPStatus
            }
        },
        validate: {
            query: {
                min: Joi.string().required().description('specify min value of pid'),
                max: Joi.string().required().description('specify max value of pid'),
            }
        }
    }
},
    // {
    //     method: 'POST',
    //     path: '/crickers',
    //     config: {
    //         handler: Handlers.createPlayer,
    //         description: 'Create New crickers',
    //         tags: ['api', 'reduced'],
    //         notes: ['Create a new crickers and updates data'],
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: resultHTTPStatus
    //             }
    //         },
    //         validate: {
    //             payload: playerSchema
    //         }
    //     }
    // },
    // {
    //     method: 'GET',
    //     path: '/crickers/{crickerId}',
    //     config: {
    //         handler: Handlers.getByIdPlayer,
    //         description: 'Get crickers By ID',
    //         tags: ['api', 'reduced'],
    //         notes: ['Fetches the existing crickers data by Id'],
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: resultHTTPStatus
    //             }
    //         },
    //         validate: {
    //             query: {
    //                 id: Joi.string().required().description('Id: cricker Id')
    //             }
    //         }
    //     }
    // }
    // ,{
    //     method: 'PUT',
    //     path: '/crickers/{crickerId}',
    //     config: {
    //         handler: Handlers.updatePlayer,
    //         description: 'Update existing cricker Data',
    //         tags: ['api', 'reduced'],
    //         notes: ['Update a crickers data by Id'],
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: resultHTTPStatus
    //             }
    //         },
    //         validate: {
    //             payload: playerSchema,
    //             query: {
    //                 id: Joi.string().required().description('Id: cricker Id')
    //             }
    //         }
    //     }
    // },
    // {
    //     method: 'DELETE',
    //     path: '/crickers/{crickerId}',
    //     config: {
    //         handler: Handlers.deletePlayer,
    //         description: 'Delete a cricker Data',
    //         tags: ['api', 'reduced'],
    //         notes: ['Update a crickers data by Id'],
    //         plugins: {
    //             'hapi-swagger': {
    //                 responses: resultHTTPStatus
    //             }
    //         },
    //         validate: {
    //             payload: {
    //                 _id: Joi.string().required(),
    //                 pid: Joi.string().required(),
    //                 name: Joi.string().required(),
    //             }
    //         }
    //     }
    // }
];