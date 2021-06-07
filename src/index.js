let addToy = false;
let toyContainer = document.querySelector("#toy-collection") // target the element/container for each card to land

const addToyCard = (toy) => { // Add toy cards to the DOM
  let newToyCard = document.createElement("div") // Create a div for the card info to land
  newToyCard.classList.add("card") // Added "card" to the list of classes for the div

  // - h2 tag with the toy.name
  let h2 = document.createElement("h2") // Create empty element
  h2.innerText = toy.name // Set the innerText to the toy.name

  // - img tag with the src of toy.image
  //   and the className = "toy-avatar"
  let img = document.createElement("img") // Create empty element
  img.src = toy.image // set the src of the img to toy.image
  img.classList.add("toy-avatar") // Add class of "toy-avatar"

  // - p tag with toy.likes
  let p = document.createElement("p") // Create empty element
  p.innerText = `${toy.likes} likes` // Set text of paragraph to toy.likes

  // - button tag with a class "like-btn" and
  //   an id attribute set to toy.id
  let btn = document.createElement("button") // Create empty element
  btn.classList.add("like-btn") // Set the class to "like-btn"
  btn.setAttribute("id", toy.id) // Set the ID of the button
  btn.innerText = "Like" // Set inner text to "Like"

  newToyCard.append(h2, img, p, btn) // Append all created elements to newToyCard
  toyContainer.append(newToyCard) // Appending the toy card to the div container
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch("http://localhost:3000/toys") // Fetch toys from the backend
    .then(resp => resp.json()) // JSONified the response
    .then(toys => { // Iterate over data (array of toys) to add to the DOM
      toys.forEach(toy => addToyCard(toy)) // Call addToyCard for each toy object
    })

  // 2nd deliverable:
  const submitNewToyButton = document.querySelector(".submit")
  submitNewToyButton.addEventListener("click", (event) => {
    event.preventDefault()
    const toyForm = document.querySelector(".add-toy-form")
    const newToyName = toyForm.name.value
    const newToyImage = toyForm.image.value
    console.log("I just clicked the submit button")
    console.log(`submittedName: ${newToyName}, submittedImage: ${newToyImage}`)
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

/*
FIRST DELIVERABLE: Access the list of toys from an API (mocked
using JSON Server) and render each of them in a "card" on the page

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

SECOND DELIVERABLE: * Use `fetch()` to make a "POST" request to create a new toy, then add it to the
  DOM
Hook up a form that enables users to add new toys.

Create an event listener when the form is submitted,
the new toy is persisted to the database
and a new card showing the toy is added to the DOM

User Fill out a form x
THe user would click submit on the form x
That submission would grab the information that was filled out on the form
We would next wrap that information into some sort of payload
    info about the toy (name image)
    metadata the request (headers, http verb, location/path request)
Send that payload to the server
Expect the server to save the new toy to its database
server will respond with the toy object
THe client can take that toy object and add it to the page similar to the previous toys


FIRST COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/2102aa1a2f459eb942421cd2bb3372030e7fd533
SECOND COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/65ec38bc2665bb8853dce0fb12aedd3579b1b7a5
THIRD COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/d6d36eaf048dda8e6bf0ddf57693a4cb5c5a041e
FOURTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/32c746762c799a59232a850a72230193e3227225
FIFTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/22ca92413650aa1f2a7b8a50140a9d0b4ceb2a3f
SIXTH COMMIT (TRANSITION)

2nd Deliverable commits:
SEVENTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/ea9705e2476b86a2e730dfc59108ebf5902a876a
*/
