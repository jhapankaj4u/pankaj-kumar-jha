const mongoose = require('mongoose');
const db = require('../_helpers/db');

const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,     
    text: String,
    notes:String,
    lastUpdated: { type: Date, default: Date.now }
   
});

schema.set('toJSON', { virtuals: true });

schema.statics.createNote= async function(param) {

		var notes = new this(param);
		
        if(await notes.save()){            
               return  {status_code:200,message:"Note has been saved successfully"}  
        }else{
			   return  {status_code:500,message:"Something gone wrong"}  
		}
}

schema.statics.getList= async function() {

		var notes = await Notes.find();
		if(notes){			
			return  {status_code:200,list:notes}  
		}else{
			return  {status_code:404,message:"Notes not found"}   
			
		}	
}

schema.statics.getById= async function(id) {

    const notes = await Notes.findById(id);
    if (notes){
        return  {status_code:200,list:notes} 

    }else{
        return  {status_code:404,list:[],message:"Notes not found"}   

    }
}

schema.statics.deleteNotes= async function(id) {

    const notes = await Notes.findByIdAndDelete(id);
    if (notes){
        return  {status_code:200,list:notes} 

    }else{
        return  {status_code:404,list:[],message:"Notes not found"}   

    }
}

schema.statics.updateNote= async function(param,id) {
	
		var checkNote= await Notes.findById(id);
        
        if(!checkNote){
            return  {status_code:400,message:"Note not found!"}   
        }

		checkNote.title=param.title;
		checkNote.notes=param.notes;
		console.log(checkNote)
		
		if(await checkNote.save()){
             return  {status_code:200,data:checkNote,message:"Note has been succrssfully updated!"}   
        }else{
		     return  {status_code:500,data:checkNote,message:"Something gone wrong!"}   	
		}
	 
}

const Notes =mongoose.model('Notes', schema);
module.exports =Notes;
	
