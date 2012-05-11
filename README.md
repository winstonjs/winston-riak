# winston-riak

A Riak transport for [winston][0].

## Motivation
`tldr;?`: To break the [winston][0] codebase into small modules that work together.

The [winston][0] codebase has been growing significantly with contributions and other logging transports. This is **awesome**. However, taking a ton of additional dependencies just to do something simple like logging to the Console and a File is overkill.  

## Usage
``` js
  var winston = require('winston');
  
  //
  // Requiring `winston-riak` will expose 
  // `winston.transports.Riak`
  //
  require('winston-riak').Riak;
  
  winston.add(winston.transports.Riak, options);
```

In addition to the options accepted by the [riak-js][1] [client][2], the Riak transport also accepts the following options. It is worth noting that the riak-js debug option is set to *false* by default:

* __level:__ Level of messages that this transport should log.
* __bucket:__ The name of the Riak bucket you wish your logs to be in or a function to generate bucket names dynamically.

``` js
  // Use a single bucket for all your logs
  var singleBucketTransport = new (winston.transports.Riak)({ bucket: 'some-logs-go-here' });
  
  // Generate a dynamic bucket based on the date and level
  var dynamicBucketTransport = new (winston.transports.Riak)({
    bucket: function (level, msg, meta, now) {
      var d = new Date(now);
      return level + [d.getDate(), d.getMonth(), d.getFullYear()].join('-');
    }
  });
```

*Metadata:* Logged as JSON literal in Riak

## Installation

### Installing npm (node package manager)

``` bash
  $ curl http://npmjs.org/install.sh | sh
```

### Installing winston-riak

``` bash
  $ npm install winston
  $ npm install winston-riak
```

#### Author: [Charlie Robbins](http://blog.nodejitsu.com)

[0]: https://github.com/indexzero/winston
[1]: http://riakjs.org
[2]: https://github.com/frank06/riak-js/blob/master/src/http_client.coffee#L10