const to = promise => promise.then(data => [null, data]).catch(err => [err]);

module.exports = to;
