import Token, { IToken } from '../schemas/token';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

interface RefreshTokenData {
  token: string;
  expiresIn: number;
}

class Tokens {
  expiresIn!: number;
  jwtSecret!: string;
  constructor(jwtSecret: string, expiresIn: number) {
    this.expiresIn = expiresIn;
    this.jwtSecret = jwtSecret;
  }

  async refresh(token: string): Promise<RefreshTokenData> {
    const registeredToken: IToken | null = await Token.findOne({ token });
    if (!registeredToken) {
      throw new Error('403');
    }

    const { payload } = registeredToken;

    const newToken: string = await jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.expiresIn
    });

    registeredToken.token = newToken;
    await registeredToken.save();
    return {
      token: newToken,
      expiresIn: this.expiresIn
    };
  }

  async register(token: string) {
    const data: Object = jwt.verify(token, this.jwtSecret);
    const payload = _.omit(data, ['iat', 'exp']);

    await new Token({
      payload,
      token
    }).save();
  }
}

export default Tokens;
