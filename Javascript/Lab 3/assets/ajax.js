$(document).ready(main);

function main(){
    console.log("test");

    $.ajax({
        url: "assets/idm.json",
        success: function(data){
            console.log(data);    
            for(i in data.module){
                $('.modules').append(data.module[i].id);
                $('.modules').append('<br>');
                $('.modules').append(data.module[i].code);
                $('.modules').append('<br>');
                $('.modules').append(data.module[i].name);
                $('.modules').append('<br>');
                $('.modules').append(data.module[i].lecturer);
                $('.modules').append('<br>');
                $('.modules').append(data.module[i].credits);
                $('.modules').append('<br>');
                $('.modules').append('<br>');
            }
        }
    })

    $("img").dblclick(function() {
        $(this).hide();
    });

}