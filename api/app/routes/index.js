module.exports = function(app) {
	
	var notes = require('../controllers/notes');
		
	app.post('/notes', notes.create);
	app.get('/notes', notes.list);
	app.get('/notes/:id', notes.getById);
	app.put('/notes/:id', notes.update);
	app.delete('/notes/:id', notes.deleteNotes); 

	
};
