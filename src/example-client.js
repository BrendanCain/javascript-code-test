//Solution definitely isn't perfect but I only started learning javascript this morning

const BookSearchApiClient = require("./BookSearchApiClient.js");

const client = BookSearchApiClient("http://api.book-seller-example.com", "json");
const booksByShakespeare = await client.getBooksByAuthor("Shakespeare", 10);
