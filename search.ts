import {image_search_generator} from 'duckduckgo-images-api'

(async () => {
    for await (let resultSet of await image_search_generator({ query: "birds", moderate: true ,iterations :5})){
        console.log(resultSet);
        // @ts-ignore
        resultSet.forEach(element => {
            console.log(element);
        });
    }
    console.log('end');
})();