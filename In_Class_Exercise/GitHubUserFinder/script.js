function getGithubInfo(user) { //Calling a function
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showUser(JSON.parse(this.responseText)); //Using JSON PARSE elements are turned into objects
        }
        else if (this.readyState == 4) {
            noSuchUser(user)
        }
    };
    xhttp.open("GET", "https://api.github.com/users/" + user, true);
    xhttp.send();
}
//Function is used to display the results when user id is entered along with profile picture and the github link
function showUser(user) {
    $("#h2txt").text(user.login) //User login is given
    $("#avatar").append('<img src="'+user.avatar_url+'" width="100px" height="100px"/>')//Picture of the profile is displayed
    $("#information").append('<a href="'+user.html_url+'">Github Url</a></br><a href="'+user.repos_url+'">Repo Url</a>') //Github link and repository links ae also given
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed

    $("#h2txt").text("no such profile")//When no profile is matched, this is given as output
}


$(document).ready(function () {

    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        $("#h2txt").html("")
        $("#avatar").html("")
        $("#information").html("")
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
