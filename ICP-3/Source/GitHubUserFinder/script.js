function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    var api = 'https://api.github.com/users/' + user.toString();
    alert(api);
    xhttp.open('GET', api, false);
    xhttp.send();

    return xhttp;
}

function showUser(data) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content

    $('#profile').prepend("<h2>" + data['login'] + "</h2>");
    $('.avatar').append("<img src=" + data['avatar_url']  + "height='300px' width='300px'>");
    $('.information').append("<a href=" + data['html_url'] + ">Github Link</a>");

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed

    $('#profile').append("<h2>Error username: " + username + " not found!</h2>");

}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed

        if (e.which === 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the response
            response = getGithubInfo(username);
            //alert(response.responseText);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});

