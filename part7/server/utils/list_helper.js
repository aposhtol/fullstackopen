const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
       
    return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = blogs => {

    return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
}

const mostBlogs = blogs => {
    const mostCommonAuthor = 
        _.chain(blogs)
        .countBy('author')
        .toPairs()
        .max(_.last)
        .head()
        .value()

    const blogsCount = blogs.reduce((count, { author }) => author === mostCommonAuthor ? count += 1 : count, 0)

    return {
        author: mostCommonAuthor,
        blogs: blogsCount
    }
}

const mostLikes = blogs => {
    const authorWithMostLikes =
        _(blogs)
        .groupBy('author')
        .mapValues(entries => _.sumBy(entries, 'likes'))
        .map((likes, author) => ({ likes, author }))
        .maxBy('likes')

    return authorWithMostLikes   
 }

module.exports = { 
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}