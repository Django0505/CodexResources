$(function(){
    $(".chzn-select").chosen();

    $("#topic").keydown(function(){
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
