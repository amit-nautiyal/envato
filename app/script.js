document.addEventListener("DOMContentLoaded", function() {
    fetch('https://envato.github.io/front-end-coding-test/test.json').then(function (response) {
    // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        console.log(data);
        console.log('data------', data)
        
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
});