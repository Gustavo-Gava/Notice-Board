module.exports = {
    posts: [
        {
            id: 'teste',
            title: 'Primeiro Post',
            description: 'Descrição do Primeiro Post'
        },
    ],

    getAll() {
        return this.posts
    },

    newPost(title, description) {
        let post = { title, description, id: generateID() }

        this.posts.push(post)
    },

    deletePost(id) {
        for (i in this.posts) {
            if (this.posts[i].id === id) {
                this.posts.splice(i, 1)
            }
        }
    }
}

function generateID() {
    return Math.random().toString(36).substr(2, 9)
}