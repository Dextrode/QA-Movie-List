// Root of the Image
const imgRoot = 'https://image.tmdb.org/t/p/w200';

loadList(null);

function loadList(searchParam) {
    // loads the spinner when text is pushed through 
    document.querySelector('#spinner').classList.add('movie-loading');

    let endpoint;

    // If search is null or nothing is passed,
    // else, use this endpoint instead and call loadList()
    if(searchParam === null) {
        // this displays the most popular movies from themoviedb database
        endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=e3c65e092c566a2c2108537a99ec0d1d&language=en-US&page=1';
    } else {
        // this allows users to search for a specific movie within the entire database
        // encodeURI replaces characters in a string with escape sequences 
        endpoint = 'https://api.themoviedb.org/3/search/movie?api_key=e3c65e092c566a2c2108537a99ec0d1d&language=en-US&page=1&query=' + encodeURI(searchParam);
    } 
        
    // console.log(endpoint);

    Promise.all([
        // fetch endpoint to connect to the API
        fetch(endpoint)
    ])

        .then(
            responses => Promise.all(responses.map(function (response) { 
                return response.json();
            }))
        )

        // Set the endpoint as data
        .then((data) => {

            console.log(data);
            // set data to addToContainer so we can essentually use it
            addToContainer(data);

        })

        // catches an error if one is made in the Promise above
        .catch((error) => {
            console.error('Error', error);
        })

        .finally(() => {
            document.querySelector('#spinner').classList.remove('movie-loading');
            }); 
}

const listArray = [];
const listSet = new Set(listArray);
const newDiv = document.createElement("li");

// Using addToContainer function, pass the data from the endpoint and call "data"  and set it as "result"
function addToContainer(result) {
    
    // Contains all the movies 
    var movieContainer = document.querySelector('#movie-container');
    // console.log(result[0].results.length

    // Will loop the array and check the results 
    // initialize with i=0 and i++ will loop and find the corresponding data by looking at the length of the results array
    // Will grab the data that will be displayed on the page
    for(let i=0; i < result[0].results.length; i++) {

        // creating the main div
        var card = document.createElement('div');
        card.classList.add('movie');

        // A tag will wrap the image and link users to Movies DB site
        var link = document.createElement('a');
        link.href = 'https://www.themoviedb.org/movie/' + result[0].results[i].id;
        card.appendChild(link);

        // setting the image
        var img = document.createElement('img');
        img.src = imgRoot + result[0].results[i].poster_path; 
        link.appendChild(img);
        img.classList.add('img');

        // creating the list
        var details = document.createElement('ul');
        details.classList.add('details');

        var info = document.createElement('div');
        details.appendChild(info);
        info.classList.add('info');

        var movieName = document.createElement('li');
        movieName.innerText = result[0].results[i].title;
        info.appendChild(movieName);
        movieName.classList.add('title');

        // creating a list item that will contain the release date
        var releaseDate = document.createElement('li');
        releaseDate.innerText = result[0].results[i].release_date;
        info.appendChild(releaseDate);
        releaseDate.classList.add('date');

        // creating a list item that will contain the average vote score
        var movieVoteAvg = document.createElement('li');
        movieVoteAvg.innerText = result[0].results[i].vote_average;
        details.appendChild(movieVoteAvg);
        movieVoteAvg.classList.add('rating');

        var button = document.createElement('button');
        button.id = result[0].results[i].id;

        var button = document.createElement('button')
        button.setAttribute('get-title', result[0].results[i].title);
        button.id = result[0].results[i].id;
        button.classList.add('btn');

        button.addEventListener("click", function(event) {
            event.preventDefault(); //Dont do normal thing (stops refreshing page)
            var targetElement = event.target || event.srcElement;
            console.log(targetElement.id);

            if(listSet.has(targetElement.id)) {
                
                listSet.delete(targetElement.id);

                document.getElementById(targetElement.id).remove();
                console.log(listSet);
                

            } else {
                if (listSet.size >=6 ) {
                    alert("Oops! You can't add anymore movies!");
                } else {
                    listSet.add(targetElement.id);
                    console.log(listSet);
                    // and give it some content
                    // add the text node to the newly created div
                    const newDiv = document.createElement("li");
                    newDiv.id = targetElement.id;
                    // add the newly created element and its content into the DOM
                    const newContent = document.createTextNode(targetElement.getAttribute('get-title'));

                    newDiv.appendChild(newContent);
                    for (const item of listSet) {
                        const currentDiv = document.getElementById("div1");
                        var itemMovie = document.createElement('li');
                        itemMovie.id = result[0].results[i].id
                        currentDiv.appendChild(itemMovie);
                        itemMovie.innerText = result[0].results[i].title;
                        break;
                    }
                }
                
            }
        });

        info.appendChild(button);

        // adding all the items to the list
        card.appendChild(details);

        // Creating the container
        movieContainer.appendChild(card);
    }

    
}
