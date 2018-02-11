const debug = require('debug')('yeps:index');
const fs = require('fs');
const util = require('util');
const path = require('path');
const Response = require('yeps-response/response');

const stat = util.promisify(fs.stat);

module.exports = ({ root, index = 'index.html', url = '/' }) => async (context) => {
  debug('YEPS index');

  if (context.req.url === `${url}${index}`) {
    debug(`Redirecting from "${url}${index}" to "${url}"`);
    const response = new Response(context);

    return response.redirect(url);
  }

  if (context.req.url === url) {
    debug('Serving index file');
    const file = path.resolve(root, index);

    try {
      debug('Checking file existing');
      await stat(file);
    } catch (err) {
      debug('File does not exist');
      debug(err);

      return Promise.resolve(context);
    }

    return new Promise((resolve, reject) => {
      debug('Setting no cache headers');

      context.res.setHeader('Surrogate-Control', 'no-store');
      context.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      context.res.setHeader('Pragma', 'no-cache');
      context.res.setHeader('Expires', '0');

      debug('Sending file');

      fs.createReadStream(file)
        .pipe(context.res)
        .on('error', reject)
        .on('close', reject)
        .on('finish', resolve);
    });
  }

  return Promise.resolve(context);
};
