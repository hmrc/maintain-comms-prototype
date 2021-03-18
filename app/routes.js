const express = require('express');
const router = express.Router();
const app = express();

// Add your routes here - above the module.exports line
// require('./routes/0-1-0/routes.js')(router);
require('./routes/0-8-0/routes.js')(router);
require('./routes/0-9-0/routes.js')(router);

module.exports = router;

router.get('/', function (req, res) {
  //initialising data elements for v0-8-0
  req.session.data['pref_type'] = "";
  req.session.data['email_status'] = "";
  req.session.data['ppob'] = "";
  res.render('index');
});


router.get('/0-1-0/account-details', (req, res) => {
  console.log(req.session)
  // res.render('0-1-0/account-details.html', {emailAddressChangeOrPending: req.session.data.emailAddress ? 'accounts@abcdigital.com' : 'sales@abcdigital.com - Pending'})
  res.render('0-1-0/account-details.html', {emailAddressChangeOrPending: req.session.data.emailAddress ? 'Pending' : 'Change'})

})


router.get('/0-2-0/account-details', (req, res) => {
  console.log(req.session)
  // res.render('0-2-0/account-details.html', {emailAddressChangeOrPending: req.session.data.emailAddress ? 'accounts@abcdigital.com' : 'sales@abcdigital.com - Pending'})
  res.render('0-2-0/account-details.html', {emailAddressChangeOrPending: req.session.data.emailAddress ? 'Pending' : 'Change'})

})



router.get('/0-2-0/email/choose-tax', function (req, res) {
      req.session.tax = req.query.tax || req.session.tax
        res.render('0-2-0/email/choose-tax', {
          'tax':req.session.tax

        })
    });
