angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('forgotPassword', function($scope,$ionicActionSheet,$location, $timeout ) {

	// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'EMAIL' },
			{ text: 'MOBILE' }
			],
			destructiveText: 'CANCEL',
			titleText: 'How would you like to reset your password?',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$location.url('/forgetPasswordEmail');
				}
				if(index == 1)
				{
					$location.url('/forgetPasswordMobile');
				}
				return true;
			},

      destructiveButtonClicked: function() {
        return true;
      }
			});
	};
	$scope.show();
	$scope.showForgotPasswordOption = function()
	{
		$scope.show();
	}
})
.controller('forgetPasswordMobile', function($scope,$http,$ionicActionSheet,$location, $timeout ) {
    $scope.resetPassword = {};
    $scope.resetPassword.updateType = "mobile";
		// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'RESEND' },
			{ text: 'OK' }
			],
			titleText: '<b>Reset code Sent!</b><br>check your mobile for a sms from ------- with a link to reset code',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$scope.generateResetCode();
				}
				if(index == 1)
				{
					$location.url('/forgetPasswordResetCode');
				}
				return true;
			}
			});
	};
	$scope.generateResetCode = function()
	{
    	$scope.error_message = '';
    	$scope.resetPassword.resetBy ='mobileNo';

	    if(typeof $scope.resetPassword.mobileNo == 'undefined' || $scope.resetPassword.mobileNo =='' || $scope.resetPassword.mobileNo == null)
	    {
	       $scope.error_message = "Please enter your mobile number";
	    }
	    else
	    {
	    	$scope.show();
	    	// please uncomment the below code

	/*
		   console.log($scope.resetPassword);
	      $http({
	      method: 'POST',
	      url: "http://139.59.11.3:3500/generateResetCode",
	      data : $scope.resetPassword
	      }).then(function successCallback(response) {
	        if(response.status == 200)
	        {
	          $scope.show();
	        }
	        else
	        {
	          // show error message
	          //$location.url('/forgetPasswordError');
	          //omit this function and unhide error message url
	        }
	      }, function errorCallback(response) {
	      // handle error
	      });
		*/

	    }
	}
})
.controller('forgetPasswordEmail', function($http,$scope,$ionicActionSheet,$location, $timeout ) {
    $scope.resetPassword = {};
    $scope.resetPassword.updateType = "emailId";
	// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'RESEND' },
			{ text: 'OK' }
			],
			titleText: '<b>Reset code Sent!</b><br>check your mobile for a sms from ------- with a link to reset code',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$scope.generateResetCode();
				}
				if(index == 1)
				{
					$location.url('/forgetPasswordResetCode');
				}
				return true;
			}
			});
	};
	$scope.generateResetCode = function()
	{
		$scope.error_message = '';
		$scope.resetPassword.resetBy ='emailId';
	    if(typeof $scope.resetPassword.emailId == 'undefined' || $scope.resetPassword.emailId =='' || $scope.resetPassword.emailId == null)
	    {
	       $scope.error_message = "Please enter your email id";
	    }
	    else
	    {
	    	 $scope.show();
	    /*
	    	console.log($scope.resetPassword);
		    $http({
		    method: 'POST',
		    url: "http://139.59.11.3:3500/generateResetCode",
		    data : $scope.resetPassword
		    }).then(function successCallback(response) {
		      if(response.status == 200)
		      {
		        $scope.show();
		      }
		      else
		      {
		        // show error message for unauthentic user
		        $location.url('/forgetPasswordError');
		        //omit this function and unhide error message url
		      }
		    }, function errorCallback(response) {
		    // handle error
		    });

		*/

		}
	}
})
.controller('forgetPasswordResetCode', function($http,$scope,$timeout,$interval,$location) {
  $scope.resetPassword = {};
	$scope.resetCodeTime = 60000;
	$timeout(function() {
		$location.url('/forgotPassword');
	}, $scope.resetCodeTime);

	$scope.coundownTimer = 0;
	$scope.coundownTimerLeft = 0;
	 var stop;
        $scope.startInterval = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stop) ) return;

          stop = $interval(function() {
            $scope.coundownTimerLeft = ($scope.resetCodeTime/1000) - $scope.coundownTimer ;
		$scope.coundownTimer++;
          }, 1000);
        };

        $scope.stopInterval = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopInterval();
        });
	$scope.startInterval();

	$scope.enterResetCode = function()
	{

		$scope.error_message = '';
	    if(typeof $scope.resetPassword.resetCode == 'undefined' || $scope.resetPassword.resetCode =='' || $scope.resetPassword.resetCode == null)
	    {
	       $scope.error_message = "Please enter your reset code";
	    }
	    else
	    {
        $location.url('/resetForgotPassword');
/*
			console.log($scope.resetPassword);
		    $http({
		    method: 'POST',
		    url: "http://139.59.11.3:3500/compareResetCodeOfUser",
		    data : $scope.resetPassword
		    }).then(function successCallback(response) {
		      if(response.status == 200)
		      {
		        $localstorage.setItem("token",response.token);
		        $location.url('/resetForgotPassword');
		        // added data make login and redirect to login or dashboard
		      }
		      else
		      {
		        $location.url('/forgetPasswordError');
		      }
		    }, function errorCallback(response) {
		    // handle error
		    });

			*/
		}
	}
})
.controller('resetForgotPassword', function($scope,$timeout,$interval,$location) {
  $scope.resetPassword = {};
	//$scope.resetPassword.token = localstorage.getItem("token");
	$scope.UpdatePassword = function()
	{
		$scope.error_message = '';
		if(typeof $scope.resetPassword.password =='undefined' || $scope.resetPassword.password =='' || $scope.resetPassword.password ==null)
		{

			$scope.error_message = "Please enter your password";
			return false;
		}
		if(typeof $scope.resetPassword.confirmPass =='undefined' || $scope.resetPassword.confirmPass =='' || $scope.resetPassword.confirmPass ==null)
		{

			$scope.error_message = "Please confirm your password";
			return false;
		}
		if( $scope.resetPassword.password !=  $scope.resetPassword.confirmPass)
		{
				$scope.error_message = "confirm password dont match";
				return false;

		}

		/*
		console.log($scope.resetPassword);
	    $http({
	    method: 'POST',
		    url: "http://139.59.11.3:3500/resetForgotPassword",
		    data : $scope.resetPassword
	    }).then(function successCallback(response) {
	      if(response.status == 200)
	      {
	        // added data make login and redirect to  dashboard
	      }
	      else
	      {
	        // show error here
	      }
	    }, function errorCallback(response) {
	    // handle error
	    });
	    */
	}

})

.controller('forgetPasswordError', function($scope,$timeout,$interval,$location) {

})


.controller('resetPassword', function($scope,$http,$timeout,$interval,$location) {
	$scope.resetPassword = {};
	$scope.userName = "gaurav";
	$scope.UpdatePassword = function()
	{
		$scope.error_message = '';
		if(typeof $scope.resetPassword.password =='undefined' || $scope.resetPassword.password =='' || $scope.resetPassword.password ==null)
		{

			$scope.error_message = "Please enter your password";
			return false;
		}
		if(typeof $scope.resetPassword.confirmPass =='undefined' || $scope.resetPassword.confirmPass =='' || $scope.resetPassword.confirmPass ==null)
		{

			$scope.error_message = "Please confirm your password";
			return false;
		}
		if( $scope.resetPassword.password !=  $scope.resetPassword.confirmPass)
		{
				$scope.error_message = "confirm password dont match";
				return false;

		}
		console.log($scope.resetPassword);
	    $http({
	    method: 'POST',
		    url: "http://139.59.11.3:3500/userLogin/login",
		    data : $scope.resetPassword
	    }).then(function successCallback(response) {
	      if(response.status == 200)
	      {
	        // added data make login and redirect to login or dashboard
	      }
	      else
	      {
	        // show error here
	      }
	    }, function errorCallback(response) {
	    // handle error
	    });
	}

})

.controller('updateAccount', function($scope,$http,$timeout,$interval,$location,$ionicActionSheet) {
	// Triggered on a button click, or some other target

	$scope.old_data = {
		firstName 	: "gaurav",
		lastName 	: "mahajan",
		phoneNumber: 9878025000,
		email 	: "ggauravmahajan143@gmail.com"
	};
	$scope.user = {
		firstName 	: "gaurav",
		lastName 	: "mahajan",
		phoneNumber: 9878025000,
		email 	: "ggauravmahajan143@gmail.com",
	};
	$scope.update_type = '';
	$scope.userPassword = '123456';
	$scope.user_image = "img/ionic.png";

	$scope.showPhoneNumberConfirm = function() {
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'CONFIRM PHONE NO' },
			],
			destructiveText: 'CANCEL',
			titleText: 'Please confirm your phone',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$scope.update_type = 'password';
				}

				return true;
			},

      destructiveButtonClicked: function() {
        return true;
      }
			});
	};

	$scope.showEmailConfirm = function() {
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			{ text: 'CONFIRM EMAIL ID' },
			],
			destructiveText: 'CANCEL',
			titleText: 'Please confirm your email id',
			//cancelText: 'Cancel',
			cancel: function() {
			// add cancel code..
			},
			buttonClicked: function(index) {
				if(index == 0)
				{
					$scope.update_type = 'email';
				}

				return true;
			},

      destructiveButtonClicked: function() {
        return true;
      }
			});
	};
	//$scope.show();
	$scope.updateUserDetails = function()
	{
		$scope.error_message = '';
		if(typeof $scope.user.firstName =='undefined' || $scope.user.firstName =='' || $scope.user.firstName ==null)
		{

			$scope.error_message = "Please enter your first name";
			return false;
		}
		if(typeof $scope.user.lastName =='undefined' || $scope.user.lastName =='' || $scope.user.lastName ==null)
		{

			$scope.error_message = "Please enter your last name";
			return false;
		}
		if(typeof $scope.user.email =='undefined' || $scope.user.email =='' || $scope.user.email ==null)
		{

			$scope.error_message = "Please enter your email";
			return false;
		}
		if(typeof $scope.user.phoneNumber =='undefined' || $scope.user.phoneNumber =='' || $scope.user.phoneNumber ==null)
		{

			$scope.error_message = "Please enter your phone number";
			return false;
		}
		if($scope.user.phoneNumber != $scope.old_data.phoneNumber)
		{
			$scope.showPhoneNumberConfirm();
			return false;
		}

		if($scope.user.email != $scope.old_data.email)
		{
			//$scope.showEmailConfirm();
			//return false;
		}
		$scope.updateUserAccountDetails();
	}
	$scope.UpdateAccount = function()
	{
		$scope.error_password = '';
		$scope.error_email 		= '';
		if($scope.update_type == 'password')
		{
			$scope.confirmUserPhoneNo = document.getElementById("confirmUserPhoneNo").value;

			if($scope.confirmUserPhoneNo == $scope.phoneNumber)
			{
				$scope.updateUserAccountDetails();
			}
			else
			{
				$scope.error_password = 'Please enter correct phone no';
			}
		}
		if($scope.update_type == 'email')
		{
			$scope.confirmEmail = document.getElementById("confirmUserEmail").value;
			if($scope.confirmEmail == $scope.user.email)
			{
				$scope.updateUserAccountDetails();
			}
			else
			{
				$scope.error_email = 'Please confirm your email id';
			}
		}
	}

	// call an api to update account details
	$scope.updateUserAccountDetails = function()
	{
		console.log("in update api section");
		$http({
	    method: 'POST',
		    url: "http://139.59.11.3:3500/userLogin/login",
		    data : $scope.user
	    }).then(function successCallback(response) {
	      if(response.status == 200)
	      {
	        // added data make login and redirect to login or dashboard
	      }
	      else
	      {
	        // show error here
	      }
	    }, function errorCallback(response) {
	    // handle error
	    });
	}
})


	/*
    backend code for generation of reset code

    function generateResetCode(req,res)
    {
      var request_type = req.body.resetBy;
      var resetCode=1000+Math.round(Math.floor()*9000)

      var table = "user";
      var field ="resetCode";
      var sql = require('mssql');

      if(request_type =='mobileNo')
      {
        if_field = "mobileNo";
        if_value = req.body.mobileNo;
      }
      else
      {
        if_field = "emailId";
        if_value = req.body.emailId;

      }

      var connection1 = new sql.Connection(config, function(err) {
      //console.log(err);

      var request = new sql.Request(connection1); // or: var request = connection1.request();

      var query = "UPDATE "+table+" SET "+field+" = "+resetCode +" where "+if_field+"="+if_value;

      request.query(query).then(function(recordset) {
        if(recordset.length>0)
        {
            if(request_type =='mobileNo')
            {
              // send sms with reset code  resetCode
            }
            else
            {

                  var nodemailer = require('nodemailer');
                  var to_mail = "abcd@gmail.com"
			            var subject = "[ASAP] Reset code for forgot password";
			            var body = "HEllo user, <br><br>your reset code id "+resetCode+"<br>use it to reset your code<br> Thanks";
			                // create reusable transporter object using the default SMTP transport
			                var transporter = nodemailer.createTransport('smtps://'+config.email_user+':'+config.email_password+'@'+config.email_host);
			                // setup e-mail data with unicode symbols
			                var mailOptions = {
			                    from        : config.email_from+'<'+config.email_user+'>', // sender address
			                    to          : to_mail, // list of receivers
			                    subject     : subject, // Subject line
			                    text        : '', // plaintext body
			                    html        : body // html body
			                };
			                // send mail with defined transport object
			                transporter.sendMail(mailOptions, function(error, info){
			                    if(error){
			                        return console.log(error);
			                    }
			                    else
			                    {
			                        //console.log(info);
			                    }
			                });
	                }).catch(function(err) {
	                	console.log(err)
	                	//res.send({data : err});
	                	connection1.close();
	                    // ... query error checks
	                });
            }
        }
        else
        {
          // send error message for user not existing
         res.status(203).send("user not exist");
        }
    });
    }

  function compareResetCodeOfUser()
  {
    var table = "user";
    var field = "resetCode";
    var resetCode = request.body.resetCode;
    var sql = require('mssql');
     var connection1 = new sql.Connection(config, function(err) {
      //console.log(err);

      var request = new sql.Request(connection1); // or: var request = connection1.request();

      var query = "select * from   "+table+" where "+field+" = "+resetCode;

        request.query(query).then(function(recordset) {
          if(recordset.length>0)
          {
          // the id of user having that reset code
            var updateQuery = "UPDATE  "+table+" SET "+field+" = ''  where id="+recordset[0].id;
            request.query(query).then(function(recordset) {

            // generate token for user
            //var token = generated token;

              res.send({token : token});
            });
          }
          else
          {
            res.status(203).send("error");
          }
        });


      });

  }


		*/

	
