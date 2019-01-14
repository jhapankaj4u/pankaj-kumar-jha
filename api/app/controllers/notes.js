var Notes = require('../models/notes');
	
exports.create=function(req, res, next) {
    
    var params=req.body;
  
    if(params.title==''){
		res.status(400).json({message:"Please enter title of note"});return;
	}
		
	 Notes.createNote(req.body)
        .then(
			rows =>{ 
				
				if(req.body.autosave==1){
								
					res.status(rows.status_code).json({message:rows.message})
				}else{
					Notes.getList().then(
					list=>{
						res.status(list.status_code).json({message:"Note has been saved successfully",lists:list.list})
					},
					error=>{res.status(500).json({message:'some thing gone wrong'})}
					
					)	
				}	
				
			},
			err =>{res.status(500).json({message:'some thing gone wrong'})}
        ).catch(next);
	
}  

exports.list=function(req, res, next) {

	Notes.getList().then(
	list=>{
		res.status(list.status_code).json({lists:list.list})
	},
	error=>{res.status(500).json({message:'some thing gone wrong'})}
	
	)	
}

exports.getById=function(req, res, next) {
	
	
	
	Notes.getById(req.params.id).then(
	list=>{
		res.status(list.status_code).json({lists:list.list})
	},
	error=>{res.status(500).json({message:'some thing gone wrong'})}
	
	)	
	
	
}	

exports.deleteNotes=function(req, res, next) {
	
	
	
	Notes.deleteNotes(req.params.id).then(
	list=>{
		Notes.getList().then(
				list=>{
					res.status(list.status_code).json({message:"Note has been deleted successfully",lists:list.list})
				},
				error=>{res.status(500).json({message:'some thing gone wrong'})}
				
				)	
	},
	error=>{res.status(500).json({message:'some thing gone wrong'})}
	
	)	
	
	
}	

exports.update=function(req, res, next) {
	
	var params=req.body;
  
    if(params.title==''){
		res.status(400).json({message:"Please enter title of note"});return;
	}
	
	 Notes.updateNote(req.body,req.params.id)
	.then(
		rows =>{ 
			
			if(req.body.autosave==1){
							
				res.status(rows.status_code).json({message:rows.message})
			}else{
				Notes.getList().then(
				list=>{
					res.status(list.status_code).json({message:"Note has been saved successfully",lists:list.list})
				},
				error=>{res.status(500).json({message:'some- thing gone wrong'})}
				
				)	
			}	
			
		},
		err =>{res.status(500).json({message:'some thing gone wrong'})}
	).catch(next);
	
	
}





