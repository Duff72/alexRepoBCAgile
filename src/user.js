class User {
  constructor(username, profilePic) {
    this.username = username;
    this.profilePic = profilePic;
  }
};

const johnDoe = new User('JohnDoe345', 'images/cat.jpeg');

const nutty = new User('nutty543', 'images/nutty.jpeg');

let users = []

function addUser(user) {
  users.push(user);
};

addUser(johnDoe);

addUser(nutty);

let currentUser = users[0];



////////////////////////////////////////////////////////


 // An integer currentPhotoIndex that represents which photo in the photoList is currently displayed
    let currentUserIndex = 0,

    //A nextPhoto() function that moves currentPhotoIndex to the next index if there is one, and:
    nextUser = function() {
        if (this.currentUserIndex < users.length - 1) {
            this.currentUserIndex++;

            //   logs the current photo name
            console.log(this.users[this.currentUserIndex]);
        } else {

            // Otherwise, log "End of slideshow";
            console.log(users[currentUserIndex]);
        }
    },
    // A prevPhoto() function that does the same thing, but backwards.
    previousUser = function() {
        if (this.currentUserIndex > 0) {
            this.currentUserIndex--;
            console.log(this.users[this.currentUserIndex]);
        } else {
            console.log(users[currentUserIndex]);
        }
    },
    // A function getCurrentPhoto() that returns the current photo from the list.
    getCurrentUser = function() {
        console.log(this.users[this.currentUserIndex]);
    
};

previousUser();