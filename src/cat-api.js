import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_nALdwfSWuFBYxK7EQ3d6m5TFw5t5EMDXv9O7mAAKBbGFERqKV3U0Msy5jSwN6P0u";

axios.defaults.baseURL = "https://api.thecatapi.com/v1/";

export function fetchBreeds() {
    return fetchData("/breeds");
}

export function fetchCatByBreed(breedId) {
    return fetchData(`/images/search?breed_ids=${breedId}`);
}

async function fetchData(URL) {
    return axios.get(URL).then(response => {
        if (response.status !== 200) {
            throw new Error(response.Error);
        }
        return response.data;
    });
}