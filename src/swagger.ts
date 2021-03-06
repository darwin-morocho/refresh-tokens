export default {
    swagger: '2.0',
    schemes: ['https', 'http'],
    basePath: '/refresh-tokens',
    produces: ['application/json'],
    paths: {
        '/refresh': {
            post: {
                'x-swagger-router-controller': 'home',

                description: 'refresh one expired token',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        type: 'string',
                        description: 'expired jwt token'
                    }
                ],
                responses: {
                    '500': {
                        description: 'error message'
                    },
                    '200': {
                        description: 'a new jwt token',
                        examples: {
                            '': {
                                token: '',
                                expiresIn: 5000
                            }
                        }
                    }
                }
            }
        }
    }
};
