# installation

NPM

```
npm i https://github.com/darwin-morocho/refresh-tokens.git
npm explore @dina.ec/refresh-tokens -- npm i
npm explore @dina.ec/refresh-tokens -- npm run build
```

YARN

```
yarn add https://github.com/darwin-morocho/refresh-tokens.git
yarn --cwd node_modules/@dina.ec/refresh-tokens/ add
yarn --cwd node_modules/@dina.ec/refresh-tokens/ run build
```

# Use

### No ES6

```jsx
const refreshTokens = require('@itzam/refresh-tokens/dist/index');

new refreshTokens.default({
  app, // Express aplication
  uris: 'mongodb://<user>:<password>@<host>:<port>/<DB_NAME>',
  jwtSecret: 'JWT_SECRET',
  connectionOptions: {
    useNewUrlParser: true
  },
  expiresIn: 60 * 10 // 10 minutes in seconds
});
```

### ES6

```jsx
import RefreshTokens from '@itzam/refresh-tokens/dist/index';

new TefreshTokens({
  app, // Express aplication
  uris: 'mongodb://<user>:<password>@<host>:<port>/<DB_NAME>',
  jwtSecret: 'JWT_SECRET',
  connectionOptions: {
    useNewUrlParser: true
  },
  expiresIn: 60 * 10 // 10 minutes in seconds
});
```
