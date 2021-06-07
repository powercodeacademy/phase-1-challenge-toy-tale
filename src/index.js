let addToy = false;

const addToyCard = (toy) => {
  console.log(toy)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch("http://localhost:3000/toys") // Fetch toys from the backend
    .then(resp => resp.json()) // JSONified the response
    .then(toys => { // Iterate over data (array of toys) to add to the DOM
      toys.forEach(toy => addToyCard(toy)) // Call addToyCard for each toy object
    })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// Access the list of toys from an API (mocked using
// JSON Server) and render each of them in a "card"
// on the page

/*

- Fetch toys from the backend
- iterate through the response and create one
  card for every toy (variable name toy)
  - h2 tag with the toy.name
  - img tag with the src of toy.image
    and the className = "toy-avatar"
  - p tag with toy.likes
  - button tag with a class "like-btn" and
    an id attribute set to toy.id
    ** add in an event listener for liking
       the toys


FIRST COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/2102aa1a2f459eb942421cd2bb3372030e7fd533
*/