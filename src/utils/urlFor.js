const urlFor = endpoint => {
  return 'https://www.googleapis.com/books/v1/volumes?q=' + endpoint;
};

export default urlFor;