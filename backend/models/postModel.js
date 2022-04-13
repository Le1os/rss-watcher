const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    creator: String,
    title: String,
    link: String,
    pubDate: String,
    //"dc:creator" : String,
    content: String,
    contentSnippet: String,
    categories: Array
  });
  
  module.exports = mongoose.model('Post', postSchema);