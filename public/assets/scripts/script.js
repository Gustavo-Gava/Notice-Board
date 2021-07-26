document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
})

function updatePosts() {

    fetch("http://localhost:3000/api/all").then(res => {
        return res.json()
    }).then(json => {
        posts = JSON.parse(json)

        let postElements = ""

        posts.forEach(post => {
            let postElement = `
            <div class="post-wrapper">
                <div class="post-header">
                    <h2>${post.title}</h2>
                </div>
                <div class="post-body">
                    <p>${post.description}</p>
                    <div class="icon">
                        <i class="fa fa-trash-o" aria-hidden="true" onclick="deletePost('${post.id}')"></i>
                    </div>
                </div>
            </div>
            `
            postElements += postElement
        })

        document.getElementById('posts').innerHTML = postElements

    })
}

function newPost() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value

    if (!checkInputs()) {
        return
    }

    let post = { title, description }

    const options = {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch('http://localhost:3000/api/new', options).then(() => {
        updatePosts()
        hideModal()
    })

    document.getElementById("title").value = ""
    document.getElementById("description").value = ""

}

function deletePost(id) {

    let post = { id }

    const options = {
        method: "DELETE",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch('http://localhost:3000/api/delete', options).then(() => {
        updatePosts()
    })

}

function showModal() {
    let modal = document.getElementsByClassName("modal")[0];
    console.log("oie")
    modal.classList.remove("hidden")
}

function hideModal() {
    let modal = document.getElementsByClassName("modal")[0]
    modal.classList.add("hidden")

    defaultInputs()
}

function checkInputs() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let titleInput = document.getElementById('title')
    let descriptionInput = document.getElementById('description')
    let checkError = false

    if (title.replace(/ /g, "") == "") {
        titleInput.style.border = "2px solid red"
        checkError = true
    } else {
        titleInput.style.border = "2px solid #3485ff"
    }
    if (description.replace(/ /g, "") == "") {
        descriptionInput.style.border = "2px solid red"
        checkError = true
    } else {
        descriptionInput.style.border = "2px solid #3485ff"
    }

    if (checkError) {
        return false
    } else {
        return true
    }
}

function defaultInputs() {
    let titleInput = document.getElementById('title')
    let descriptionInput = document.getElementById('description')

    titleInput.style.border = "2px solid #3485ff"
    descriptionInput.style.border = "2px solid #3485ff"
}