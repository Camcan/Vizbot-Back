var services = require('../services/mongooseServices');

var user = {
}

exports.getUser = function(req, res){
    services.getUserById(req.params.id, function(user){
    if(user)
  	 res.json(user);
    else{
      res.status(404).end("User not avalaible");
    }
  });
};

exports.createUser = function(req, res){
	if(req.body == null) res.status(400).end("Syntax error");
	 else if(!req.body.name || !req.body.mail || !req.body.pwd || !req.body.address || !req.body.registration){
	  res.status(400).end("Missing field");
	 }
	 else{
	  var user = {
	    nickname : req.body.nickname,
	    mail : req.body.mail,
	    pwd : req.body.pwd,
	    address : req.body.address,
	    registration : req.body.registration
	  }
	  services.createUser(user, function(code, id){
	    if(code == 201){
	      res.setHeader("url", req.url);
	      res.setHeader("id", id);
	      res.status(code).end("User added");
	    }
	    else if(code == 409)
	      res.status(code).end("Conflict : Unable to add User");
	  });
	 }
};

exports.logIn = function(req, res){
	if(req.body.mail && req.body.pwd){
	    services.logIn(req.body.mail, req.body.pwd, function(id, code){
	      if(code == 404) res.status(code).end("Nonexistent user");
	      else{
	        res.setHeader("id", id);
	        res.status(code).end();
	      }
	    });
	  } else res.status(400).end('{"error" : "syntax error"}');
};




