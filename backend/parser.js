const fs = require("fs");
const Post = require('../backend/models/postModel');
const Parser = require("rss-parser");

let parser = new Parser();

let _parse = async (_log = console.log) => {
  // let feed = await parser.parseURL('https://daily-dev-tips.com/sitemap.xml');
  let feed = await parser.parseURL('https://lifehacker.com/rss');
  // let feeds = [];


  for (let item of Object.entries(feed.items) ) {
    let _post = item[1]
      //feeds.push(_post);
    let postExist = await Post.exists({title: `${_post.title}`})

    if (!postExist) {
      await Post.create({
        creator: _post.creator,
        title: _post.title,
        link: _post.link,
        pubDate: _post.pubDate,
        //"dc:creator" : item['dc:creator'],
        content: _post.content,
        contentSnippet: _post.contentSnippet,
        categories: _post.categories,
      });
    }
  }
};

let toParse = _parse()

module.exports = {
  toParse,
}
