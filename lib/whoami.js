var shell = require('shelljs');
require('shelljs/global');

var name = shell.exec('git config --get user.name', {
    silent: true
}).stdout.trim();

var email = shell.exec('git config --get user.email', {
    silent: true
}).stdout.trim();

var result = name ? name : process.env.USER;

if (!which('git')) {
    result = 'Pick a name';
    email = 'Your email';
}

if (email) {
    result += ' <' + email + '>';
}

module.exports = result;