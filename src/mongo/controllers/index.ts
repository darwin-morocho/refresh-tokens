// eslint-disable-next-line no-unused-vars
import RefreshTokens, { IToken } from '../schemas/token';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

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
        const registeredToken: IToken | null = await RefreshTokens.findOne({
            token
        });
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

    async register(input: {
        userId?: string;
        token: string;
        pushNotificationToken?: string;
    }) {
        const { userId, token, pushNotificationToken } = input;
        const data: Object = jwt.verify(token, this.jwtSecret);
        const payload = _.omit(data, ['iat', 'exp']);

        await new RefreshTokens({
            userId,
            payload,
            token,
            pushNotificationToken
        }).save();
    }

    async setPushNotificationToken(
        token: string,
        pushNotificationToken: string
    ): Promise<void> {
        const registeredToken: IToken | null = await RefreshTokens.findOne({
            token
        });
        if (!registeredToken) {
            throw new Error('404');
        }
        registeredToken.pushNotificationToken = pushNotificationToken;
        await registeredToken.save();
    }

    async getPushNotificationTokens(userId: string): Promise<string[]> {
        const data = await RefreshTokens.find({
            userId: Types.ObjectId(userId),
            pushNotificationTokens: { $ne: null, $exists: true }
        }).select('pushNotificationTokens -_id');

        let tokens = [] as string[];
        data.forEach((item) => {
            tokens.push(item.pushNotificationToken!);
        });
        return tokens;
    }
}

export default Tokens;
