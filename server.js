const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');

var app = express();

//braking page templates in parts like header, body, footer etc.
hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine','hbs'); //loading view engine


//registering middlewares
app.use((req, res, next)=>{
	var now  = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log)
	fs.appendFile('server.log',log + '\n', (err)=>{
		if(err){
			console.log('Unable to append to server.log.');
		}
	});
	next(); //must call to finish when work for middleware is done.
});

app.use((req, res, next)=>{
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));


//handlebars helpers
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
//handlebars helpers
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(request,response)=>{
	response.render('home.hbs',{
		pageTitle : 'Home | dhimanamit.com',
		pageHeading : 'Welcome to my website.',
		data : 'The quick brown fox jumps over the lazy dog.',
		//currentYear : new Date().getFullYear()
	});
});


/*
app.get('/',(request,response)=>{
	//response.send('<h1>Hello Express!</h1>');
	response.send({
		name:'Amit Dhiman',
		likes:[
			'Biking','Skates'
		]
	});
});
*/

app.get('/about',(req,res)=>{
	//res.send('<h2>Abou Page</h2>');
	res.render('about.hbs',{
		pageTitle : 'About Page',
		pageHeading : 'About Us',
		//currentYear : new Date().getFullYear() 
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorType:'Bad Request Given.',
		errorDesc:[
			2565,
			'Unable to connect to Database.'
		]
	});
});


app.listen(3000,()=>{
	console.log("Server is up on port number 3000");
});
