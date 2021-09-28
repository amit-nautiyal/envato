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

        // sort data from highest to lowest rating
        let sortedData = sortBasedOnRatings(data);
        console.log('sortedData------', sortedData);

        root.innerHTML = buildList(sortedData);
        
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
});

function sortBasedOnRatings(data) {
    let sorted = data.items.sort(function(a, b){
        return b.rating - a.rating;
    });
    return sorted;
}

function buildList(items) {
    let html = ''
    for (item of items) {
      for (key in item) {
        html += `<div class="card">`;
        if(Math.floor(item.rating) === 5) {
            html += `<span class="card__banner">Top rated!</span>`;
        };
        html += `<div class="card__img"><img src='${item.cover_image[3].url}' /></div>`
        html += `<h3 class="card__title">${item.title}</h3>`
        html += `<p class="card__author">by <strong>${item.author}</strong></p>`
        html += `<footer class="card__footer">`
        html += `<span class="card__ratings">${Math.floor(item.rating)}</span>`
        html += `<span class="card__action"><strong>Remove</strong><img class="icon" src="../_assets/remove.svg" alt='remove item' /></span>`
        html += `</footer>`
        html += '</div>';
      }
    }
    return html;
  }