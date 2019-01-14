angular.module("notes", [])
   
.controller("listController", function($scope,$http) {
   
   $scope.listOfNotes={};
   $scope.list=1;
   $scope.title="New Document";
   $scope.notes="";
   $scope.count=0;
   $scope.message='';
   $scope.save='';
   
   $scope.edit = function(e){
	   
	   $scope.message='';
		$http.get(BASEURL + '/notes/'+e).success(function(data, status) {
					
				if(status==200){
					title=data.lists.title;
					$scope.notes=data.lists.notes;
					$scope.list=2;	
					$scope.save=e;		
				}else{
					
				  alert(data.message)	;
				}							
					
		});
	   
 
   }
   
   
   $scope.openNew = function(e){
	   $scope.message='';
	   if(e!=''){
		$scope.edit(e);return;   
	   }
	    title="New Document";
	    $scope.notes="";
	    $scope.list=2;
	    $scope.save='';	
   }
   
   $scope.cancel = function(e){
	    $scope.message='';
	    title="New Document";
	    $scope.notes="";
	    $scope.list=1;
	    $scope.save='';	
   }
   
   
   $scope.fetchLists=function(){
	   $scope.message='';
		$http.get(BASEURL + '/notes').success(function(data, status) {
					
				if(status==200){
					$scope.listOfNotes=data.lists;	
					$scope.count=Object.keys($scope.listOfNotes).length;				
				}else{
					
				  alert(data.message)	;
				}							
					
		});	
					   
   }
   
   $scope.deleteNote=function(id){
	   		   $scope.message='';
	   if(confirm("Do you want to delete all noted!")){

			$http.delete(BASEURL + '/notes/'+id).success(function(data, status) {
						
					if(status==200){
						$scope.listOfNotes=data.lists;	
						$scope.count=Object.keys($scope.listOfNotes).length;				
					}else{
						
					  alert(data.message)	;
					}							
						
			});	
	   }	
					   
   }

   $scope.update=function(id){
	   
	   $scope.message='';

	   $http.put(BASEURL + '/notes/'+id,{title:$scope.title,notes:$scope.notes,autosave:0}).success(function(data, status) {
					
				if(status==200){
					$scope.listOfNotes=data.lists;	
					$scope.count=Object.keys($scope.listOfNotes).length;	
					$scope.list=1;	
					$scope.message="Note has been saved successfully"		
				}else{
					
				  alert(data.message)	;
				}							
					
		});	
					   
   }
   
   $scope.saveLists=function(){
	   
	   $scope.message='';
		if($scope.save!=''){
			$scope.update($scope.save); return;
		}
	   $http.post(BASEURL + '/notes',{title:$scope.title,notes:$scope.notes,autosave:0}).success(function(data, status) {
					
				if(status==200){
					$scope.listOfNotes=data.lists;	
					$scope.count=Object.keys($scope.listOfNotes).length;	
					$scope.list=1;	
					$scope.message="Note has been saved successfully"		
				}else{
					
				  alert(data.message)	;
				}							
					
		});	
					   
   }
   
   $scope.fetchLists();
   
   
  
});
   
 
