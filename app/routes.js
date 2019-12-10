const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
// require('./routes/0-1-0/routes.js')(router);

module.exports = router

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
