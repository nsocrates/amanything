/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    created_by : 'Socrates',
    text : 'Hello',
    created_at: 1442208612318,
    username: 'AwesomeUser',
    posted_on: 'main',
    reply: ''
  }, {
    created_by : 'Socrates',
    text : 'Hello Again',
    created_at: 1442208612319,
    username: 'AwesomeUser',
    posted_on: 'main',
    reply: ''
  }, {
    created_by : 'Socrates',
    text : 'Something',
    created_at: 1442208612320,
    username: 'AwesomeUser',
    posted_on: 'main',
    reply: ''
  }, {
    created_by: 'Test',
    text: 'Hi, Socrates!',
    created_at: 1442208612320,
    username: 'Test User',
    posted_on: 'AwesomeUser',
    reply: ''
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    username: 'Test User'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    username: 'Admin'
  }, {
    provider: 'local',
    name: 'Socrates',
    email: '123@123.com',
    password: '123',
    username: 'AwesomeUser'
  }, function() {
      console.log('finished populating users');
    }
  );
});
