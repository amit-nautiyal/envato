const dataUrl ='https://envato.github.io/front-end-coding-test/test.json';

document.addEventListener("DOMContentLoaded", function() {
    fetchedData();
});

function fetchedData() {
    fetch(dataUrl).then(function (response) {
    // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        console.log('data------', data);

        // sort data from highest to lowest rating
        let sortedData = sortBasedOnRatings(data);
        console.log('sortedData------', sortedData);
        let root = document.querySelector('#root');
        if(root) {
            root.innerHTML = buildList(sortedData);
        }
        
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

function sortBasedOnRatings(data) {
    let sorted = data.items.sort(function(a, b){
        return b.rating - a.rating;
    });
    return sorted;
}

function removeItem(ele) {
    ele.closest('.card').classList.add('hide');
}

function buildList(items) {
    let html = '';
    for (item of items) {
        html += `<div class="card">`;
        if(Math.floor(item.rating) === 5) {
            html += `<span class="card__banner">Top rated!</span>`;
        };
        html += `<div class="card__img">
                    <picture>
                        <source media="(max-width: 700px)" srcset="${item.cover_image[2].url} 400w">
                        <source media="(max-width: 1300px)" srcset="${item.cover_image[1].url} 300w">
                        <source media="(max-width: 1600px)" srcset="${item.cover_image[2].url} 400w">
                        <source media="(max-width: 1800px)" srcset="${item.cover_image[3].url} 500w">
                        <source media="(max-width: 2500px)" srcset="${item.cover_image[4].url} 600w">
                        <img src="${item.cover_image[1].url} 300w" alt="a placeholder image" />
                    </picture>
                </div>`
        html += `<h3 class="card__title">${item.title}</h3>`
        html += `<p class="card__author">by <strong>${item.author}</strong></p>`
        html += `<footer class="card__footer">`
        html += `<span class="card__ratings" style="--rating: ${Math.floor(item.rating)};" aria-label="Rating of this product is ${item.rating} out of 5."></span>`
        html += `<span class="card__action" onclick="removeItem(this)"><strong>Remove</strong><img class="icon" src="../_assets/remove.svg" alt='remove item' /></span>`
        html += `</footer>`
        html += '</div>';
    }
    return html;
  }