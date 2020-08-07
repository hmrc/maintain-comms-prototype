module.exports = function (router) {

   var version = "0-8-0";

   router.get('/' + version + '/start', function (req, res) {
     if(req.session.data['pref_type']=="letter"){
       req.session.data['pref_type'] = "email"
     }
     else{
       req.session.data['pref_type'] = "letter"
     }

       res.render(version + '/login');
   });

   router.post('/' + version + '/contact-pref-scenarios', function (req, res){
     req.session.data['current_preference'] = req.body.pref_type;
     res.redirect('contact-pref-scenarios1');
   });

   router.post('/' + version + '/contact-pref-scenarios1', function (req, res){
     res.redirect('login');
   });

   router.get('/' + version + '/choose-preference', function (req, res) {
     if(req.session.data['ppob']=='ppob_pending'){
       res.render(version + '/problem-change-pending');
     }
     else{
       res.render(version + '/choose-preference')
     }
   });

   router.post('/' + version + '/choose-preference', function (req, res){
     if(req.body.change_pref_to == "email"){
       if (req.session.data['email_status'] == "email_confirmation_pending") {
         req.session.data['email_status'] = "email_needed"
       }
       if (req.session.data['email_status'] == "email_needed") {
         //method for no email
         res.redirect('problem-no-email');
       }
       else {
         req.session.data['temp_pref_type'] = req.body.change_pref_to;
         res.redirect('choose-email');
       }
     }
     else if (req.body.change_pref_to == "letter") {
       req.session.data['pref_type'] = req.body.change_pref_to;
       res.redirect('confirmation-update-preference');
     }
     else if (req.body.change_pref_to == "no") {
        res.redirect('account-details');
     }
   });



   router.post('/' + version + '/choose-email', function (req, res){
    if (req.body.change_pref_to == "no") {
      req.session.data['email_status'] = "email_needed";
      req.session.data['change_pref_to'] = 'email';
      res.redirect('./email/business-email?tax=vat');
    }
    else{
      req.session.data['pref_type'] = "email";
      res.redirect('./confirmation-update-preference');
    }

   });

   router.post('/' + version + '/problem-no-email', function (req, res){
     if (req.body.email_change == "yes") {
       res.redirect('./email/business-email?tax=vat');
     }
     else {
       res.redirect('account-details');
     }
   });


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
         var updated = "false";

         if(req.query.ppobupdated === "updated"){
           updated = "true";
         }

        console.log(updated);

          req.session.company = req.query.company || req.session.company;
         res.render(version + '/account-details',{
                   'indNameUpdating':req.session.indNameUpdating,
                   'bankUpdating':req.session.bankUpdating,
                   'businessAddress':req.session.businessAddress,
                   'vatFreqUpdating':req.session.vatFreqUpdating,
                   'company':req.session.company,
                   'updated':updated
                    }
           );
       });



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
           if (req.query.tax == "vat") {
             res.redirect(301, '/' + version + '/email/confirmation-email')
           }
           else{
           req.session.user = req.body.path;
             res.redirect(301, '/' + version + '/email/choose-tax');
           }
         });

         router.post('/' + version + '/email/confirm-email', function (req, res){
           req.session.user = req.body.path;
           req.session.email = req.body.email;
           req.session.emailUpdating = true;
             res.redirect(301, '/' + version + '/email/confirmation-email');
         });

         router.get('/' + version + '/email/confirmation-email', function (req, res) {
               req.session.data['emailAddress'] = "unverified";
               req.session.data['pref_type'] = "email";
               req.session.company = req.query.company || req.session.company
               req.session.BTAuser = req.query.BTAuser || req.session.BTAuser
               req.session.emailUpdating = req.query.emailUpdating || req.session.emailUpdating


                 res.render(version + '/email/confirmation-email', {
                   'BTAuser':req.session.BTAuser,
                   'company':req.session.company,
                   'email':req.session.email

                 })
             });

        router.get('/' + version + '/email/confirmation-preferences', function (req, res) {
          req.session.data['emailAddress'] = "sales@abcdigital.com";

          res.render(version + '/email/confirmation-preferences');
        });

        router.post('/' + version + '/add-preference' + '/confirmation-email', function (req, res){
          res.redirect('/' + version + '/email' + '/confirmation-preferences');
        });

        router.post('/' + version + '/email' + '/confirmation-email', function (req, res){
          res.redirect('/' + version + '/email' + '/confirmation-preferences');
        });

}
