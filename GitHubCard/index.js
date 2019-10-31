const cardsDiv = document.querySelector('.cards');

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

//Uncomment section below to get my card:

/* 
axios.get('https://api.github.com/users/ethyl2')
  .then( response => {
    console.log(response);
    let userCard = createCard(response.data);
    cardsDiv.appendChild(userCard);
  })
  .catch( error => {
    console.log("Error: ", error);
  })
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/



/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your 
          github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames 
          and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const myFollowersArray = ['Tirzahe', 'ovflowd', 'KaiHaskell', 'lyndsiWilliams', 'zimashima'];

function displayFollowersFromArray(followersArray) {
  followersArray.forEach((follower) => {
    let followerUrl = 'https://api.github.com/users/' + follower;
    axios.get(followerUrl)
    .then( response => {
      //console.log(response);
      let userCard = createCard(response.data);
      cardsDiv.appendChild(userCard);
    })
    .catch( error => {
      console.log("Error: ", error);
    })
  })
}

//Uncomment line below to get myFollowersArray followers' cards:

//displayFollowersFromArray(myFollowersArray);

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return
           the following DOM element:


<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

const create = el => document.createElement(el);

function createCard(user) {
  
  let cardDiv = create('div');
  cardDiv.classList.add('card');

  let cardImg = create('img');
  cardImg.src = user.avatar_url;

  let cardInfoDiv = create('div');
  cardInfoDiv.classList.add('card-info');
  let nameH3 = create('h3');
  nameH3.classList.add('name');
  nameH3.textContent = user.name;

  let usernameP = create('p');
  usernameP.classList.add('username');
  usernameP.textContent = user.login;

  let locationP = create('p');
  if (user.location) {
  locationP.textContent = `Location: ${user.location}`;
  }

  let profileP = create('p');
  let profileA = create('a');
  profileA.href = user.html_url;
  profileA.textContent = user.html_url;
  profileP.appendChild(profileA);

  let followersP = create('p');
  followersP.textContent = `Followers: ${user.followers}`;

  let followingP = create('p');
  followingP.textContent = `Following: ${user.following}`;

  let bioP = create('p');
  if (user.bio) {
  bioP.textContent = `Bio: ${user.bio}`;
  }

  let emailP = create('p');
  emailP.textContent = user.email;

  let companyP = create('p');
  companyP.textContent = user.company;

  let hireP = create('p');
  let answer = 'yes';
  if (user.hireable === false) {
    answer = 'no';
  }
  hireP.textContent = "Hireable: " + answer;

  let dateP = create('p');
  let dateObj = new Date(user.created_at);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let myFormattedDate = months[dateObj.getMonth()] + " " + dateObj.getFullYear();
  dateP.textContent = "GitHub user since " + myFormattedDate;

  let btnSpan = create('span');
  btnSpan.classList.add('expandButton');
  btnSpan.textContent = '⮋';
  let arrow = "down";
  btnSpan.addEventListener('click', () => {
    cardInfoDiv.classList.toggle('card-expand');
    if (arrow === 'down') {
      //change it to up when clicked
      btnSpan.textContent = '⮉';
      arrow = "up";
    } else {
      // change it to down when clicked
      btnSpan.textContent = '⮋';
      arrow = "down";
    }
  })

  cardInfoDiv.append(nameH3, usernameP, locationP, profileP, 
    followersP, followingP, bioP, emailP, companyP, hireP, dateP);
  cardDiv.append(cardImg, cardInfoDiv, btnSpan);
  //console.log(cardDiv);
  return cardDiv;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

/* Stretch: Instead of manually creating a list of followers, do it programmatically. 
Create a function that requests the followers data from the API after it has 
received your data and create a card for each of your followers. Hint: you can 
chain promises.
*/
function getLoginsFromFollowersUrl(followersUrl) {
  let loginsArray = [];
  axios.get(followersUrl)
  .then( response => {
    //console.log(response);
    response.data.forEach(follower => {
      loginsArray.push(follower.login);
    });
    //console.log("Here's logins array: " + loginsArray);
    displayFollowersFromArray(loginsArray);
    }) 
  .catch( error => {
    console.log("Error: ", error);
  })
}

function displayFollowers(user) {
  let userUrl = 'https://api.github.com/users/' + user;
  axios.get(userUrl)
  .then( response => {
    //console.log(response);
    let userCard = createCard(response.data);
    cardsDiv.appendChild(userCard);
    let followersUrl = response.data.followers_url;
    //console.log(followersUrl);
    return followersUrl;
  })
  .then (followersUrl => {
    getLoginsFromFollowersUrl(followersUrl);
  })
  .catch( error => {
    console.log("Error: ", error);
  })
}

displayFollowers('ethyl2');