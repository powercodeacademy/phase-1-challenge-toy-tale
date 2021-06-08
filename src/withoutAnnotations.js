let addToy = false
const toyContainer = document.querySelector("#toy-collection")

const addToyCard = (toy) => {
  const newToyCard = document.createElement("div")
  newToyCard.classList.add("card")

  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.innerText = `${toy.likes} likes`

  const btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.setAttribute("id", toy.id)
  btn.innerText = "Like"

  newToyCard.append(h2, img, p, btn)
  toyContainer.append(newToyCard)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")

  // 1st Deliverable
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(toy => addToyCard(toy))
    })

  // 2nd deliverable:
  const submitNewToyButton = document.querySelector(".submit")
  submitNewToyButton.addEventListener("click", (event) => {
    event.preventDefault()
    const toyForm = document.querySelector(".add-toy-form")
    const newToyName = toyForm.name.value
    const newToyImage = toyForm.image.value
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

    fetch("http://localhost:3000/toys", configurationObject)
      .then(response => response.json())
      .then(data => {
        addToyCard(data)
      })
  })

  // hide & seek with the form
  addBtn.addEventListener("click", () => {
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
})