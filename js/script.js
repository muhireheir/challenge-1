var loader = document.querySelector("#loader");
var cards = document.querySelectorAll(".cards");
var heading = document.querySelector(".heading");
var backBtn = document.querySelector("#back-btn");


const showUsers = (data) => {
  heading.innerHTML = "Content Creators";
  cards[0].innerHTML = '';
  data.map(({ name, email, id }) => {
    cards[0].innerHTML += `<div class="card">
          <div class="user">
            <div class="user-info">
              <div class="font-weight-bold">${name}</div>
              <div>${email}</div>
            </div>
            <div class="action">
              <button class="btn" onClick="getUsersPost('${id}','${name}')">Posts</button>
            </div>
          </div>
    </div>
` })
}


const showposts = (data, name) => {
  heading.innerHTML = `${name}' posts`;
  cards[0].innerHTML = '';
  data.map(({ body, title }) => {
    cards[0].innerHTML += ` 
    <div class="card">
          <div class="user">
            <div class="blog-post">
              <div class="font-weight-bold blog-title">${title}</div>
              <div class="blog-content">${body}</div>
            </div>
          </div>
        </div>` })
}

const getAllUsers = () => {
  loader.style.display = 'block';
  backBtn.style.display = 'none';
  cards[0].innerHTML = '';
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((data) => {
      showUsers(data);
      loader.style.display = 'none';
    }
    );
}

const getUsersPost = (userId, name) => {
  cards[0].innerHTML = '';
  loader.style.display = 'block';
  backBtn.style.display = 'block';

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(response => response.json())
    .then((data) => {
      showposts(data, name);
      loader.style.display = 'none';
    }
    );
}
backBtn.addEventListener('click', () => {
  getAllUsers();
});
getAllUsers();