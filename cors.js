var options = {
        origins: []                       // implicit same as ['*'], and null
      , methods: ['HEAD', 'GET', 'POST']  // OPTIONS is always allowed
      , headers: [                        // both `Exposed` and `Allowed` headers
            'X-Requested-With'
          , 'X-HTTP-Method-Override'
          , 'Content-Type'
          , 'Accept'
        ]
      , credentials: false                // don't allow Credentials
      , resources: [
          {
              pattern: '/'                // a string prefix or RegExp
          //, origins
          //, methods
          //, headers
          //, credentials
          }
        ]
    };

var Connect = require('connect')
  , CORS = require('connect-cors')
  , server
  ;

server = Connect.createServer(
    // uses reasonable defaults when no options are given
    CORS(options)
  , function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World');
    }
);

// the `options` object will be popullated with empty arrays
// and is live-editable (great for testing and dynamic APIs)
console.log(options);

server.listen(9000);