const Blog = require('../models/blog')

const initialBlogs = [
    {
    _id: "62f6682e538da6ae8ee4ef70",
    title: "Zvijezda Sjevernjaca",
    author: "Mika Snjaric",
    url: "https://novaznanost.club/zvsj",
    likes: 245,
    __v: 0
    },
    {
    _id: "62f6688c538da6ae8ee4ef73",
    title: "Svi sojevi svijeta",
    author: "Semsa Suljagovic",
    url: "https://novaznanost.club/sss",
    likes: 188,
    __v: 0
    },
    {
    _id: "62f8d3bd4c675648e5edac99",
    title: "Let3 - ispucavanje cepova iz guzice",
    author: "Aco Stankovic",
    url: "https://novaznanost.club/let3_guzica",
    likes: 188,
    __v: 0
    }
    ]

    module.exports = {
        initialBlogs
    }