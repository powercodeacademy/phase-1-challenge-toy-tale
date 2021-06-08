let addToy = false
const toyContainer = document.querySelector("#toy-collection") // target the element/container for each card to land

const handleLikeToy = (event) => {
  /*
    When the button is clicked, the number of likes should be
    updated in the database

    Make a patch request to the database
    - Find an example of a configurationObject to go off of
    - Make sure the method is PATCH (used for updating)
    - Update the body with the information we're trying to change
      - Need the current # of likes it has (to be able to add 1)
    - Send data to the right URL
      - Need the ID of the toy being liked
  */

  // Need the ID of the toy being liked so we can identify which toy to update
  const clickedButton = event.target
  const toyId = clickedButton.id
  const fetchUrl = `http://localhost:3000/toys/${toyId}`

  // Need the current # of likes it has
  // Need the new # of likes
  const paragraphWithLikes = clickedButton.previousSibling
  const previousLikes = parseInt(paragraphWithLikes.innerText)
  const newLikes = previousLikes + 1


  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  }

  fetch(fetchUrl, configurationObject)
    .then(res => res.json())
    .then(data => {
      // the updated information should be rendered to the DOM
      paragraphWithLikes.innerText = `${data.likes} likes`
    })
}

const addToyCard = (toy) => { // Add toy cards to the DOM
  const newToyCard = document.createElement("div") // Create a div for the card info to land
  newToyCard.classList.add("card") // Added "card" to the list of classes for the div

  // - h2 tag with the toy.name
  const h2 = document.createElement("h2") // Create empty element
  h2.innerText = toy.name // Set the innerText to the toy.name

  // - img tag with the src of toy.image
  //   and the className = "toy-avatar"
  const img = document.createElement("img") // Create empty element
  img.src = toy.image // set the src of the img to toy.image
  img.classList.add("toy-avatar") // Add class of "toy-avatar"

  // - p tag with toy.likes
  const p = document.createElement("p") // Create empty element
  p.innerText = `${toy.likes} likes` // Set text of paragraph to toy.likes

  // - button tag with a class "like-btn" and
  //   an id attribute set to toy.id
  const btn = document.createElement("button") // Create empty element
  btn.classList.add("like-btn") // Set the class to "like-btn"
  btn.setAttribute("id", toy.id) // Set the ID of the button
  btn.innerText = "Like" // Set inner text to "Like"
  btn.addEventListener("click", (event) => handleLikeToy(event)) // Add event listener to deal with folks clicking the "Like" button

  newToyCard.append(h2, img, p, btn) // Append all created elements to newToyCard
  toyContainer.append(newToyCard) // Appending the toy card to the div container
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")

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

    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImage,
        likes: 0
      })
    }

    console.log(configurationObject)

    fetch("http://localhost:3000/toys", configurationObject)
      .then(response => response.json())
      .then(data => {
        addToyCard(data)
      })
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
})

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

FIRST COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/2102aa1a2f459eb942421cd2bb3372030e7fd533
SECOND COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/65ec38bc2665bb8853dce0fb12aedd3579b1b7a5
THIRD COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/d6d36eaf048dda8e6bf0ddf57693a4cb5c5a041e
FOURTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/32c746762c799a59232a850a72230193e3227225
FIFTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/22ca92413650aa1f2a7b8a50140a9d0b4ceb2a3f
SIXTH COMMIT (TRANSITION)


SECOND DELIVERABLE: * Use `fetch()` to make a "POST" request to create a new toy, then add it to the
  DOM
Hook up a form that enables users to add new toys.

Create an event listener when the form is submitted,
the new toy is persisted to the database
and a new card showing the toy is added to the DOM

User Fill out a form x
THe user would click submit on the form x
That submission would grab the information that was filled out on the form x
We would next wrap that information into some sort of payload x
    info about the toy (name image)
    metadata the request (headers, http verb, location/path request)
Send that payload to the server x
Expect the server to save the new toy to its database x
server will respond with the toy object x
THe client can take that toy object and add it to the page similar to the previous toys x

2nd Deliverable commits:
SEVENTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/ea9705e2476b86a2e730dfc59108ebf5902a876a
EIGHTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/19dc980587d788a398f7aa1c052ad65e76c0cd68
NINTH COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/4e1cdac031eaea52f4092841489b3eb8f0a71614
Tenth COMMIT: https://github.com/powercodeacademy/phase-1-challenge-toy-tale/commit/5fa7b955b14ba87a1ac42763926ad5b66bfd86e9
ELEVENTH COMMIT (TRANSITION)
Twelvth COMMIT (linted woo!)

THIRTEENTH COMMIT (clean-up annotations, add clean working file)


THIRD DELIVERABLE
- Create an event listener that gives users the ability to click a button to
"like" a toy.
  - Attach an event listener to every button
  - When a new button (new toy/card) is added, also attach an event listener to that
- When the button is clicked, the number of likes should be
updated in the database
- the updated information should be rendered to the DOM


*/



// {
//   "name": "Sporky",
//   "image": "sporky.jpg",
//   "likes": 0,
//   "id": 9
// },
// {
//   "name": "Forky",
//   "image": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Forky_waving.png/220px-Forky_waving.png",
//   "likes": 0,
//   "id": 10
// },
// {
//   "name": "Zurg",
//   "image": "https://static.wikia.nocookie.net/pixar/images/8/86/FE111586-19EE-447D-8902-9DD1745A2257.png/revision/latest?cb=20181126205610",
//   "likes": 0,
//   "id": 11
// },
// {
//   "name": "Mrs. Potato Head",
//   "image": "https://static.wikia.nocookie.net/pixar/images/a/a7/BEST_MRS.POTATO_HEAD_EVER.png/revision/latest/top-crop/width/360/height/360?cb=20210210225058",
//   "likes": 0,
//   "id": 12
// }