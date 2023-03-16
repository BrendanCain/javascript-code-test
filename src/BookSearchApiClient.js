import fetch from 'node-fetch';

const DEFAULT_LIMIT = 10;

function BookSearchApiClient(url, format) {
  this.url = url;
  this.format = format;
}

function parseBooksFromJson(json) {
  // Extract the book data from a json object
  const books = json.map(function (item) {
      return {
        title: item.book.title,
        author: item.book.author,
        isbn: item.book.isbn,
        quantity: item.stock.quantity,
        price: item.stock.price,
      };
  });

  return books;
}

function parseBooksFromXml(xmlDocument) {
  // Extract the book data from an XmlDocument
  // TODO - We should be using the GetElementsByTagName or similar here but I don't have the spec to implement 100% accurately
  // TODO - Depending on your confidence in the spec you could potentially parse to JSON, but xml doesn't always form 100% safe json
  const books = xmlDocument.documentElement.childNodes.map(function (item) {
    return {
      title: item.childNodes[0].childNodes[0].nodeValue,
      author: item.childNodes[0].childNodes[1].nodeValue,
      isbn: item.childNodes[0].childNodes[2].nodeValue,
      quantity: item.childNodes[1].childNodes[0].nodeValue,
      price: item.childNodes[1].childNodes[1].nodeValue,
    };
  });

  return books;
}

// Should we expose this or just build calls on top of it?
async function getBooks(path, queryValue, limit) {
    const url = new URL(path.join(this.baseUrl, path));

    url.searchParams.append("q", queryValue);
    url.searchParams.append("limit", limit);
    url.searchParams.append("format", this.format);

    try {
      const response = await fetch(url);
      if (response.ok) {
        if(this.format == "json") {
          return parseBooksFromJson(JSON.parse(response.json));

        } else if(this.format == "xml") {
          return parseBooksFromXml(new window.DOMParser().parseFromString(response.text, "text/xml"));

        } else {
          alert("Specified format " + this.format + " not supported");

        }
      } else {       
        alert("Request failed.  Returned status of " + response.status);

      }
    } catch (error) {
      if (error.name === "AbortError") {
        alert("Request was aborted");
      }
    }
};

BookSearchApiClient.prototype.getBooksByAuthor = async function (queryValue, limit = DEFAULT_LIMIT) {
  return await getBooks("by-author", queryValue, limit);
}

module.exports = BookSearchApiClient
