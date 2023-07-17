import { fetchBreeds, fetchCatByBreed } from "./cat-api";


const refs = {
    selector: document.querySelector(".breed-select"),
    imgBox: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
}

refs.selector.addEventListener("change", () => {
   refs.loader.style.display="block"
    fetchCatByBreed(refs.selector.value)
        .then(arr => {
            refs.imgBox.innerHTML = createImgMarkup(arr)
            refs.loader.style.display = "none";
        })
        .catch((err) => console.log(err));
})


function createSelectorMarkup(arr) {
    return arr.map(({ id, name }) => `
    <option value="${id}">${name}</option>
    `).join("");
}

function createImgMarkup(arr) {
    return arr.map(({ url, breeds }) => `
    <img src="${url}" alt="${breeds[0].name}" width="500px" />
    <div>
    <h2>${breeds[0].name}</h2>
    <p>${breeds[0].description}</p>
    <p><span><b>Temperament: </b></span>${breeds[0].temperament}</p>
    </div>
    
    `)
        .join("");
}

fetchBreeds()
    .then(data => {
        refs.selector.insertAdjacentHTML("beforeend", createSelectorMarkup(data));
        refs.loader.style.display = "none";
    })
    .catch((err) => {
        console.log(err)
        refs.loader.style.display = "none";
        refs.error.style.display = "block";
    });

/*
serviceMovie()
    .then(data => {
        selectors.container.insertAdjacentHTML('beforeend', createMarkup(data.results))
        if (data.page < data.total_pages) {
            observer.observe(selectors.guard);
        }
    })
    .catch(() => location.href = './error.html')


    console.log(history);
function serviceMovie(page = 1) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const END_POINT = '/trending/movie/week';
    const API_KEY = "345007f9ab440e5b86cef51be6397df1";
    return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }

            return resp.json();
        })
}
*/