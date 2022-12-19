
// Your application should do the following

// 1 Allow the user to search for a GIF - when the form is submitted, make an AJAX request to the Giphy API and return a single GIF

// 2 Once the Giphy API has responded with data, append the GIF to the page

// 3 Allow the user to search for as many gifs as they would like and keep appending them to the page

// 4 Allow the user to remove all of the gifs by clicking a button

//

// Define Global Scope Variables -

const myKey = 'CWwVc05BrahBbRb0Vju9Wwi2SReRxMxV' // saved value of the GIPHY API Key

const searchForm = document.querySelector('#giphy-search') // selects search form and saves to variable

const gifDiv = document.querySelector('#gifs') // selects the area of the page for gifs to be added and saves to variable

const removeButton = document.querySelector('#remove') // selects the remove button and saves to variable

const searchLine = document.querySelector('#search-bar') // selects the search bar and saves to variable


//

// Define Functions -

// Creates a random index - used later to select a gif from the API response
function randomIndexGenerator(length){
    return (Math.floor(Math.random() * length) + 1)
};

// Accepts (a) search term(s) to pass along. Makes API call to GIPHY Search Endpoint. Returns the url for the "fixed_height" version of a gif that is randomly selected from the default response of 50 gifs
async function searchGif(searchTerm){

    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {params: {api_key: myKey, q: searchTerm,}});
    const randomIndex = randomIndexGenerator(res.data.data.length);
    return res['data']['data'][randomIndex]['images']['fixed_height']['url']

}

// Accepts a gif url, creates a new img element, sets the images src to the gif url, and adds the new img element to the designated area of the page
function addGifToPage(gifUrl){

    const newGif = document.createElement('img')
    newGif.src = gifUrl
    gifDiv.append(newGif)

}

//

// Add Site Functionality -

// Creates a submit event listener for the search form, selects and saves the values entered into the search form, runs searchGif to get a gif URL from GIPHY, runs addGifToPage to add that gif to the page, resets the value of the search box so additional searches can be made without manually deleting previous terms
searchForm.addEventListener('submit', async function(e){

    e.preventDefault()
    const gifUrl = await searchGif(searchLine['value']);
    searchLine['value'] = ''
    addGifToPage(gifUrl);

})

removeButton.addEventListener('click', function(e){

    e.preventDefault()
    gifDiv.innerText = ''

})