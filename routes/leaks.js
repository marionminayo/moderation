const express = require('express')
const router = express.Router()


const CopyleaksCloud = require('.././NodeJS-Plagiarism-Checker-master/src/Components/CopyleaksCloud.js');
const _ = require('lodash');

const clCloud = new CopyleaksCloud();
const config = clCloud.getConfig();

const email = 'marionminayo@outlook.com';
const apikey = '59ED030B-598C-4583-9A6A-BA0363B55E10';


router.post('/copy',function(req,res){
	const file = req.body
	console.log(file)
	const file2 = file["path"]
	console.log(file2)
	

	clCloud.login(email,apikey,config.E_PRODUCT.Businesses,callback);
	/* Check if token still valid: */
		//clCloud.loginToken.validateToken() //return true or false

	function callback(resp,err){

	    //CHECK CREDIT BALANCE FOR YOUR ACCOUNT
	    /* 
	    clCloud.getCreditBalance(function(resp,err){
	    	//check if we have credits
	    	if(resp && resp.Amount){
	    		console.log('You have this amount of credits left: '+resp.Amount);
	    	}
	    });
		*/

			/* Optional Request Headers - for more information see - https://api.copyleaks.com/GeneralDocumentation/RequestHeaders */
	    const _customHeaders = {};
	    _customHeaders[config.SANDBOX_MODE_HEADER] = false;
		_customHeaders[config.HTTP_CALLBACK] = 'http://requestbin.fullcontact.com/1104v3n1'
	
		
		
	    /* Create a process using a file - to get full list of supported file types use the example bellow */
	    const _file = file2;
	   clCloud.createByFile(_file,_customHeaders,function(resp,err){
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-file');
	       		console.log('Process has been created: '+resp.ProcessId);
	    	}
    		if(!isNaN(err))
				console.log('Error: ' + err);
	    });
		
    }
    
    process.on("exit", function() {
        console.log('Closed process');
      });
	
});



module.exports = router