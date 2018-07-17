
const requestp = require('request-promise');
const SwiftContainer = require('./SwiftContainer');
const SwiftEntity = require('./SwiftEntity');
const util = require('util');
const util_url = require('url');

module.exports = SwiftClient;


function formateUrl(username, url, version = 'v1') {
    const firstName = username.split(':')[0];

    const parseUrl = util_url.parse(url);

    const newUrl = util_url.format({
      protocol: parseUrl.protocol,
      host: parseUrl.host,
      pathname: `${version}/AUTH_${firstName}`
    });
    return newUrl;
}
function SwiftClient(username, url, token, version) {
  url = formateUrl(username, url, version);
  SwiftEntity.call(this, 'Container', url, token);
}

util.inherits(SwiftClient, SwiftEntity);


SwiftClient.create = function (url, username, password, version) {
  var _this = this;

  return requestp({
      method: 'GET',
      uri: url,
      headers: {
        'x-auth-user': username,
        'x-auth-key': password
      },
      resolveWithFullResponse: true
    })
    .then(function (response) {
      return new SwiftClient(username, url, response.headers['x-auth-token'], version);
    });
};


SwiftClient.prototype.create = function (name, publicRead, meta, extra) {
  if (typeof publicRead === 'undefined') {
    publicRead = false;
  }

  if (publicRead) {
    if (!extra)
      extra = {};
    
    extra['x-container-read'] = '.r:*';
  }

  return requestp({
      method: 'PUT',
      uri: this.url + '/' + name,
      headers: this.headers(meta, extra)
    });
};


SwiftClient.prototype.container = function (name) {
  return new SwiftContainer(this.url + '/' + name, this.token);
};
