$(document).ready(function(){
    $('#passwordRepeat').blur(function(){
        var rPass = $(this).val();
        var oPass = $('#password').val();
        if(oPass != rPass){
            alert('Please enter Correct Passwords in Both Fields')
        }
    });
});