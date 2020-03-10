import {
  GOODREAD_API_KEY,
  NYTIMES_KEY,
} from 'react-native-dotenv';
import convert from 'xml-js';

export const goodReadsAuthorCall = authorID => {
  return `https://www.goodreads.com/author/show/${authorID}?format=xml&key=${GOODREAD_API_KEY}`
};

export const goodReadsSearchCall = search => {
  return `https://www.goodreads.com/search/index.xml?key=${GOODREAD_API_KEY}&q=${search}`
};

export const nyTimesBestSellersList = genre => {
  return `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${NYTIMES_KEY}`;
};

export const goodReadsConvert = response => {
  const bookDataJSON = convert.xml2js(response.data, {
    compact: true,
    spaces: 4,
    textKey: 'text',
    cdataKey: 'cdata',
    attributesKey: 'attributes',
  }); // changes xml to json
  return bookDataJSON.GoodreadsResponse;
};