import { Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import swagger from 'swagger-ui-express';
import Tokens from './mongo/controllers';
import apiDoc from './swagger';

interface InitData {
  jwtSecret: string;
  expiresIn: number; //in seconds
}

type ConnectCallback = (error?: any) => any;

class RefreshTokens {
  expiresIn: number;
  jwtSecret: string;

  constructor(data: InitData) {
    mongoose.set('useCreateIndex', true);
    this.expiresIn = data.expiresIn;
    this.jwtSecret = data.jwtSecret;
  }

  // connect to mongoDB
  connectToDB(
    connectionData: {
      uri: string;
      options?: mongoose.ConnectionOptions;
    },
    callback: ConnectCallback
  ): void {
    mongoose
      .connect(connectionData.uri, connectionData.options)
      .then(() => {
        callback();
      })
      .catch(error => {
        callback(error);
      });
  }

  // build the endpoint to refesh tokens
  init(app: Application) {
    const tokens = new Tokens(this.jwtSecret, this.expiresIn);
    app.post(
      '/refresh-tokens/register',
      this.validateJwt,
      async (req: Request, res: Response) => {
        try {
          const token: string = req.token as string;
          await tokens.register(token);
          res.send('OK');
        } catch (error) {
          console.log('refresh-tokens register error:', error);
          res.status(500).send(error.message);
        }
      }
    );

    app.post('/refresh-tokens/refresh', async (req: Request, res: Response) => {
      try {
        const token: string = req.headers.token as string;
        if (!token) {
          return res.status(403).send('missing header token');
        }
        const data = await tokens.refresh(token);
        res.send(data);
      } catch (error) {
        console.log('refresh-tokens register error:', error);
        res.status(500).send(error.message);
      }
    });

    app.use('/refresh-tokens-api-docs', swagger.serve);
    app.get('/refresh-tokens-api-docs', swagger.setup(apiDoc));
  }

  // middleware to validate a jwt
  validateJwt(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers['token'] as string;
      jwt.verify(token, this.jwtSecret);
      req.token = token;
      next();
    } catch (e) {
      res.status(403).send(e.message);
    }
  }
}

export default RefreshTokens;
