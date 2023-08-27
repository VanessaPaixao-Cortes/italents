const exportsFetchItem = {};

const fetchItem = async (ItemID) => {
  // seu código aqui
  let itemObject;
  if (ItemID !== undefined) {
    const response = await fetch(`https://petstore-8ad6d224eb11.herokuapp.com/produtos/${ItemID}`);
    exportsFetchItem.responseItem = `https://petstore-8ad6d224eb11.herokuapp.com/produtos/${ItemID}`;
    itemObject = await response.json();
  } else {
    Error('You must provide an url');
    itemObject = {};
  }
  return itemObject;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
    exportsFetchItem,
  };
}
