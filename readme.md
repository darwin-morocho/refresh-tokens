# Use

### No ES6

```jsx
const refreshTokens = require('refresh-tokens/dist/index');
const app = express(); // creates a express app
const refreshTokens = new refreshTokens.default({
  expiresIn: 60 * 10, // 10 minutes in seconds
  jwtSecret: 'JWT_SECRET'
});
// connect to mongoDB (If your project is already use mongoose and it connect with the mongoDB  you can call directly  to refreshTokens.init(app);)
refreshTokens.connectToDB(
  {
    uri: 'mongodb://<user>:<password>@<host>:<port>/<DB_NAME>'
  },
  function(error: any) {
    if (error) {
      console.log('error to connecto mongDB', error);
    } else {
      // enable the refresh Tokens API
      refreshTokens.init(app);
    }
  }
);
```

### ES6 with typescript

```jsx
import RefreshTokens from 'refresh-tokens';
const app: Application = express(); // creates a express app
const refreshTokens = new RefreshTokens({
  expiresIn: 60 * 10, // 10 minutes in seconds
  jwtSecret: 'JWT_SECRET'
});
// connect to mongoDB (If your project is already use mongoose and it connect with the mongoDB  you can call directly  to refreshTokens.init(app);)
refreshTokens.connectToDB(
  {
    uri: 'mongodb://<user>:<password>@<host>:<port>/<DB_NAME>'
  },
  function(error: any) {
    if (error) {
      console.log('error to connecto mongDB', error);
    } else {
      // enable the refresh Tokens API
      refreshTokens.init(app);
    }
  }
);
```

## Refesh Tokens API
just go to `http://<your-host:port>/refresh-tokens-api-docs`
