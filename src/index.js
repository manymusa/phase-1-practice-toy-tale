let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(obj => obj.forEach(ele => {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const img = document.createElement('img');
      const p = document.createElement('p');
      const button = document.createElement('button');
      div.setAttribute('class', 'card');
      img.setAttribute('src', `${ele.image}`);
      img.setAttribute('class', 'toy-avatar');
      button.setAttribute('class', 'like-btn');
      button.setAttribute('id', `${ele.id}`);
      button.textContent = 'Like ❤️';
      button.addEventListener('click', (e) =>{
        likes(e);
      })
      h2.textContent = ele.name;
      p.innerHTML = `${ele.likes} Likes`;
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);
      document.getElementById('toy-collection').appendChild(div);
    }))

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const form = document.querySelector('form.add-toy-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault;
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": document.getElementsByClassName('input-text')[0].value,
        "image": document.getElementsByClassName('input-text')[1].value,
        "likes": 0
      })
    })
    form.reset();
  })

  function likes(event) {
      event.preventDefault();
      let likeUpdate = parseInt(event.target.previousElementSibling.innerText[0]) + 1;
      const id = event.target.id;
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": likeUpdate
        })
        })
        .then(res => res.json())
        .then(json => event.target.previousElementSibling.textContent = `${likeUpdate} Likes`)

      }
})
