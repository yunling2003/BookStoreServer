var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var books = [
      {"Id":1, "Name":"Silicon Valley", "Description":"A story about an iron man", "Price":20, "src":"images/1.jpg"},
      {"Id":2, "Name":"Super IP", "Description":"Super IP", "Price":35, "src":"images/2.jpg"},
      {"Id":3, "Name":"One Square Physical Exam", "Description":"A square meter can do physical exam", "Price":18, "src":"images/3.jpg"},
      {"Id":4, "Name":"Creative", "Description":"Use your head to creative", "Price":9, "src":"images/4.jpg"},
      {"Id":5, "Name":"Moon Over River", "Description":"Cross the river in the moon light", "Price":26, "src":"images/5.jpg"},
      {"Id":6, "Name":"Exposure", "Description":"Social knowledge", "Price":14, "src":"images/6.jpg"},
      {"Id":7, "Name":"Essence of Business", "Description":"How to make money", "Price":51, "src":"images/7.jpg"},
      {"Id":8, "Name":"Best Team", "Description":"What is a best creative team", "Price":47, "src":"images/8.jpg"},
      {"Id":9, "Name":"How do management", "Description":"Plan is very important", "Price":88, "src":"images/9.jpg"},
      {"Id":10, "Name":"Internet Ecology", "Description":"Complicated internet ecology", "Price":13, "src":"images/10.jpg"},
      {"Id":11, "Name":"EQ decides life", "Description":"You should have a high EQ", "Price":67, "src":"images/11.jpg"},
      {"Id":12, "Name":"Common sense", "Description":"Must know common sense", "Price":11, "src":"images/12.jpg"},
      {"Id":13, "Name":"Think wide", "Description":"Don't angry about tiny thing", "Price":40, "src":"images/13.jpg"}
]

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");	
	res.header("Access-Control-Allow-Headers", "Cache-Control,Content-Type");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	next();
});

app.get('/books', function(req, res){	
	res.send(books);
});

app.get('/books/:id', function(req, res){	
	for(var i in books){		
		if(parseInt(req.params.id) === books[i].Id){			
			res.send(books[i]);			
		}
	}
	res.send();
})

app.post('/books', function(req, res){
	var book = req.body;
	if(!book.Id){
		book.Id = books[books.length - 1].Id + 1;
		books.push(book);
		res.send(book);
	}else{
		for(var i in books){
			if(parseInt(book.Id) === books[i].Id){
				books[i] = book;
				res.send(book);
			}
		}
	}		
	res.send();
});

app.put('/books/:id', function(req, res){	
	var updatedBook = req.body;	
	console.log(JSON.stringify(updatedBook));
	for(var i in books){
		if(parseInt(req.params.id) === books[i].Id){
			books[i] = updatedBook;
			break;
		}
	}
	res.send(updatedBook);
})

app.delete('/books/:id', function(req, res){
	var id = req.params.id;
	console.log('Deleting book: ' + id);
	books.splice(id - 1, 1);
	res.send(books);
});

app.listen(9002);

console.log('Listening on port 9002...');