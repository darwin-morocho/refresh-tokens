const doc = {
  basePath: '/refresh-tokens',
  produces: ['application/json'],
  paths: {
    '/register': {
      post: {
        'x-swagger-router-controller': 'Metodo para agregar una asistencia',
        operationId: '/add',
        tags: [
          'Ruta para crear una asistencia de ingreso telefónico ( desde asistenciadora hacia aseguradora).'
        ],
        description:
          'Método para registrar la solicitud de una asistencia por medio telefónico.',

        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            required: true,
            type: 'string',
            description: 'API KEY'
          },

          {
            in: 'body',
            name: 'body',
            description: 'cuerpo de la peticion',
            required: true,
            schema: { $ref: '#/definitions/add' }
          }
        ],

        responses: {
          '200': {
            description: 'Ok'
          },
          '50X': {
            description: 'Error interno del servidor'
          }
        }
      }
    },

    '/refresh': {
      post: {
        'x-swagger-router-controller':
          'Metodo para asignar proveedor a una asistencia',
        operationId: '/assigned',
        tags: ['Ruta para asignar proveedores a una una asistencia.'],
        description: 'Método para asignar proveedores a una asistencia.',

        parameters: [
          {
            name: 'x-access-token',
            in: 'header',
            required: true,
            type: 'string',
            description: 'API KEY'
          },

          {
            in: 'body',
            name: 'body',
            description: 'cuerpo de la peticion',
            required: true,
            schema: { $ref: '#/definitions/assign' }
          }
        ],

        responses: {
          '200': {
            description: 'Ok'
          },
          '50X': {
            description: 'Error interno del servidor'
          }
        }
      }
    }
  }
};

export default doc;
