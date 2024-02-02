
export default defineEventHandler(async (event) => {
    try {
        const query = getRouterParam(event, 'query');
        console.log(query)
        // can access env variable both using process.env.VARIABLE_NAME or useruntimeconfig
        const TIMESTAMP = process.env.TIMESTAMP;

        const params = new URLSearchParams({
            ts: TIMESTAMP,
            nameStartsWith: query,
            apikey: process.env.PUBLIC_KEY,
            hash: process.env.HASH,
        });

        const url = "https://gateway.marvel.com/v1/public/characters?" + params.toString();

        const data = await fetch(url)
            .then((res) => res.json())  // Invoke res.json() to get the JSON response
            .then((data) => {
                // console.log(data.data);
                return data.data.results;
            })
            .catch((error) => console.log(error));

        return {
            message: 'data fetched successfully',
            url: url,
            data: data
        };
    } catch (error) {
        return {
            message: 'error fetching data',
            error: error
        };
    }
});


