var wishes = [ "learn how to use JQuery", "build a website", "Become a Web Developer" ]

function addToList(item) {
  $('#items').append("<li>" + item + "<div class='label'>" +
      "<select onchange='update_list(this);'>" +
      "<option value=\"pending\">Pending</option>" +
      "<option value=\"done\">Done</option>" +
      "<option value=\"delete\">Delete</option>" +
      "</select>" +
      "</div>");
}
function update_list(item){
  if(item.value==='delete'){
    $(item).parent().parent().remove();
  }
  if(item.value==='done'){
    $(item).parent().parent().attr("class", 'completed');
  }
  if(item.value==='pending'){
    $(item).parent().parent().attr("class", 'a');
  }
}

function updateTotal() {
  completed = $('.success').length;
  pending = $('.pending').length;

  if (completed > 0 || pending > 0) {
    $('.total').text(" Pending: " + pending + " Completed: " + completed);
  }
}

$(document).ready(function(){
  wishes.forEach(function(element) {
    addToList(element);
  });
  updateTotal();

  $(document).on('click','#add-to-list',function(){
    item = $("#item").val();

    $("#item").val(""); /* clear value */
    $("#item").focus();

    addToList(item);
    updateTotal();
  });

});