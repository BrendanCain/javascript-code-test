//Solution definitely isn't perfect but I only started learning javascript this morning
// With more time I would have: got tests working & created more, moved solution to typescript, cleaned up the mapping through creating objects for input & outputs

const BookSearchApiClient = require("./BookSearchApiClient.js");

const client = BookSearchApiClient("http://api.book-seller-example.com", "json");
const booksByShakespeare = await client.getBooksByAuthor("Shakespeare", 10);
