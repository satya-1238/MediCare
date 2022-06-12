var cancel_addUser = document.getElementById('cancel-btn');
 
console.log('uploadfile');
$('.uploadImage').submit(function(e){
    var title = $('#title').val();
    var recieverName=$('#recieverName').val();
    var message = $('#message').val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = + dd + '-' + getMonths(mm) + '-' + yyyy; 
    // console.log(title);
    // console.log(recieverName);
    $(this).ajaxSubmit({
       data: {title: title,recieverName:recieverName,entryDate: today,message: message},
       contentType: 'application/json',
       success: function(response){
	        if(response == 'false')
	        {
	         	alert('Files are Not Uploaded');
            location.reload();
	        } 
          else if(response == 'format')
          {
            alert("File Format is not correct")
          }
	        else
	        {
	         	alert('Files uploaded successfully');
	         	location.reload();
	        }   
        }
   });
     return false;
});

cancel_addUser.addEventListener("click", function(){
	location.reload();
})

function getMonths(mno) {
    var month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    return month[mno-1];
}

