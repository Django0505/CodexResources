$(function(){
    $(".chzn-select").chosen();

    $("#topic").click(function(){
      $.get("/showTopics", function(results){
        $("#listTopics").html(results);
      });
    });
});

$(function(){
    $('#clickme').click(function(){
        $('#uploadme').click();
    });

});
