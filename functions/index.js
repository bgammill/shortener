const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.shorten = functions.https.onRequest((request, response) => {
  var url = request.query.url;
  if (!url) {
    response.json({ 'reason': 'no URL specified' });
    return;
  }

  var pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var isValidUrl = String(url).match(pattern);
  if (!isValidUrl) {
    response.json({ 'reason': 'invalid URL format' });
    return;
  }

  const nanoid = require('nanoid');
  const db = admin.database();

  var exists = false;
  var ref = db.ref('links');
  ref.orderByChild('url').limitToFirst(1).equalTo(url).once('value').then(function(snapshot) {
    var result = snapshot.val();
    if (!result) {
      let id = nanoid();
      admin.database().ref('links').push({ 'url': url });
      response.send('added');
      return;
    }
    for (var r in result) {
      response.send(r);
      return;
    }
  });
});

exports.lengthen = functions.https.onRequest((request, response) => {
  var id = request.query.id;
  const db = admin.database();
  var ref = db.ref('links/' + id);
  ref.once('value').then(function(snapshot) {
    response.send(snapshot.val().url);
  });
  return;
});

exports.redirect = functions.https.onRequest((request, response) => {
  var id = request.query.id;
  const db = admin.database();
  db.ref('links/' + id).once('value').then(function(snapshot) {
    var result = snapshot.val();
    response.redirect(301, result.url);
  });
  return;
});
