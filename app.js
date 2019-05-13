// Manipulates responseField to render a formatted and appropriate message
const renderResponse = (response) => {
    // Displays either message depending on results
    if(response.errors){
      responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    } else {  
      responseField.innerHTML = `<p>Your shortened url is: </p><p> ${response.shortUrl} </p>`;
    }
  }
  
  // Manipulates responseField to render an unformatted response for testing
  const renderRawResponse = (res) => {
    // Displays either message depending on results
    if(res.errors){  
      responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    } else {
      // Adds line breaks for JSON
      let structuredRes = JSON.stringify(res).replace(/,/g, ", \n");
      structuredRes = `<pre>${structuredRes}</pre>`;
      responseField.innerHTML = `${structuredRes}`;
    }
  }
  
  // Information to reach API
  const apiKey = 'e4d282f10601411bae5b8f9a982959d2';
  const url = 'https://api.rebrandly.com/v1/links';
  
  // Some page elements
  const inputField = document.querySelector('#input');
  const shortenButton = document.querySelector('#shorten');
  const responseField = document.querySelector('#responseField');
  
  // AJAX functions

  /*// XHR Object: POST
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten}) ;// We're including this information because the API expects to see an object with a key 'destination' that has a value of a URL; The reason for creating data is to prepare the information needed to send in the body.

  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse(xhr.response);
    }
  }
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('apikey', apiKey);
  xhr.send(data); 
}
*/

/* // fetch() POST request
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten}) ;// We're including this information because the API expects to see an object with a key 'destination' that has a value of a URL; The reason for creating data is to prepare the information needed to send in the body.

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'apikey': apiKey
    },
    body: data
  })
  .then(response => {
    if(response.ok){
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => console.log(networkError.message))
  .then(jsonResponse => {
    renderResponse(jsonResponse);
  })
}
*/

//async await fetch() POST Request
const shortenUrl = async () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});

  try{
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json',
        'apikey': apiKey
      }
    });
    if(response.ok){
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
    }
  }catch(error){
    console.log(error);
  }
}
  
  // Clear page and call AJAX functions
  const displayShortUrl = (event) => {
    event.preventDefault();
    while(responseField.firstChild){
      responseField.removeChild(responseField.firstChild);
    }
    shortenUrl();
  }
  
  shortenButton.addEventListener('click', displayShortUrl);
  