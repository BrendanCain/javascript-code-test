import expect from "expect";
import fetchMock from "jest-fetch-mock";

const BookSearchApiClient = require("../BookSearchApiClient");
const TEST_URL = "http://api.book-seller-example.com";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test("search for books by author, finding a single book", async () => {
  const bookSearchApiClient = new BookSearchApiClient(TEST_URL,"json");
  
  fetch.mockResponseOnce(JSON.stringify({ items: [
    { 
      item:{
        book: {
          title: "Thud!",
          author: "Terry Pratchett",
          isbn: 123123
        },
        stock: {
          quantity: 10,
          price: 20.0
        }
      }
    }
  ] }));

  const books = await bookSearchApiClient.getBooksByAuthor("Terry Pratchett", 5);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(books.length).toEqual(1);
  expect(books[0].title).toEqual("Thud!");
});