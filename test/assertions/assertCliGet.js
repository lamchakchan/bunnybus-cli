'use strict';

const Code = require('code');
const Exec = require('child_process').exec;
const Async = require('async');

const expect = Code.expect;

const BareMessage = require('../mocks/bareMessage.json');
const configurationPath = 'test/mocks/configuration.json';

const assertCliGet = (bunnyBus, queueName, iterations, callback) => {

    Async.timesLimit(
        iterations,
        20,
        (n, cb) => bunnyBus.send(BareMessage, queueName, cb),
        () => {

            // wc - counts the lines of output
            // xargs - strips out the number only
            // tr - removes unwanted character
            Exec(`bunnybus -G -c ${configurationPath} | wc -l | xargs | tr -d "\n"`, (err, stdout) => {

                expect(err).to.be.null();
                expect(stdout).to.be.equal(iterations.toString());
                callback();
            });
        }
    );
};

module.exports = assertCliGet;
