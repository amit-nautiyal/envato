document.addEventListener("DOMContentLoaded", function() {
    let root = document.querySelector('#root');

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
        console.log('data------', data);
        root.innerHTML = buildList(data);
        
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
});

function buildList(items) {
    let html = ''
    for (item of items.items) {
      for (key in item) {
        html += '<div class="card">';
        html += `<div class="card__img"><img src='${item.cover_image[3].url}' /></div>`
        html += `<div class="card__title">${item.title}</div>`
        html += `<div class="card__author">by ${item.author}</div>`
        html += `<div class="card__footer">`
        html += `<div class="card__ratings">${Math.floor(item.rating)}</div>`
        html += `<div class="card__action">Remove</div>`
        html += `</div>`
        html += '</div>';
      }
    }
    return html;
  }