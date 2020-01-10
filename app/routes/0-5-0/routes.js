module.exports = function (router) {

   var version = "0-5-0";


   //Agent
   router.post('/' + version + '/start', function (req, res){
     res.redirect(301, 'confirm-client');
   });


   router.post('/' + version + '/confirm-client', function (req, res){
        res.redirect(301, './overview?company=agent');
   });


   //Agent Bread
      router.get('/' + version + '/business-name', function (req, res) {
        req.session.company = req.query.company || req.session.company
          res.render(version + '/business-name', {
            'company':req.session.company
          })
      });


      router.get('/' + version + '/business-loc', function (req, res) {
        req.session.company = req.query.company || req.session.company
          res.render(version + '/business-loc', {
            'company':req.session.company
          })
      });



       router.get('/' + version + '/account-details', function (req, res) {
         req.session.company = req.query.company || req.session.company
         res.render(version + '/account-details',{
                   'addressline1': addressline1,
                   'addressline2': addressline2,
                   'addressline3': addressline3,
                   'addressline4': addressline4,
                   'postcode': postcode,
                   'addressline5': addressline5,
                   'indNameUpdating':req.session.indNameUpdating,
                   'bankUpdating':req.session.bankUpdating,
                   'businessAddress':req.session.businessAddress,
                   'vatFreqUpdating':req.session.vatFreqUpdating,
                   'company':req.session.company

                    }
           );
       });
     }


     router.get('/' + version + '/email/business-email', function (req, res) {
           req.session.company = req.query.company || req.session.company
           req.session.BTAuser = req.query.BTAuser || req.session.BTAuser
             res.render(version + '/email/business-email', {
               'BTAuser':req.session.BTAuser,
               'company':req.session.company,
               'email':req.session.email

             })
         });

         router.post('/' + version + '/email/business-email', function (req, res){
           req.session.user = req.body.path;
             res.redirect(301, '/' + version + '/email/confirm-email');
         });

         router.post('/' + version + '/email/confirm-email', function (req, res){
           req.session.user = req.body.path;
           req.session.email = req.body.email;
           req.session.emailUpdating = true;

             res.redirect(301, '/' + version + '/email/confirmation-email');
         });

         router.get('/' + version + '/email/confirmation-email', function (req, res) {
               req.session.company = req.query.company || req.session.company
               req.session.BTAuser = req.query.BTAuser || req.session.BTAuser
               req.session.emailUpdating = req.query.emailUpdating || req.session.emailUpdating


                 res.render(version + '/email/confirmation-email', {
                   'BTAuser':req.session.BTAuser,
                   'company':req.session.company,
                   'email':req.session.email

                 })
             });

}
