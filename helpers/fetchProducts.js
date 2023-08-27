const exportsFetchProducts = {};

const fetchProducts = async (query) => {
  // seu código aqui
  let object;
  const url = `https://petstore-8ad6d224eb11.herokuapp.com/produtos/`;
  if (query !== undefined) {
    const response = await fetch(url);
    exportsFetchProducts.responseProducts = url;
    object = await response.json();
  } else {
    Error('You must provide an url');
    object = {};
  }
  console.log(object.produtos);
  return object;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
    exportsFetchProducts,
  };
}
