const quoteContainer = document.getElementById('quote-container') //select by id/select id
const spinner = document.querySelector('.spinner')
const quoteBtn = document.getElementById('new-quote') //select by id/select id
const tweetBtn = document.getElementById('twitter') 
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');

let apiQuotes = []; //global variable where to ajax call response
let randomQuoteRes = {} //store the random quote

//LOADING SPINNER/RENDER SPINNER
const showSpinner = function () {
    quoteContainer.hidden = true;
};
showSpinner() //show the spinner while fetching

const hideSpinner = function () {
    quoteContainer.hidden = false;
    spinner.hidden = true;
};

// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json() //store the response into a global variable
        if(!response.ok) throw new Error('cazzo') //throw an error in case of problem
    //immediately show a quote
        hideSpinner(); //hide the spinner
        randomQuote();
    } catch (err) {
        console.log(err.message);
    };
};
//make the AJAX call at runtime
getQuotes();

//pick one random quote and print on the screen
const randomQuote = function() {
    const randomIndex = Math.floor(Math.random() * apiQuotes.length);
    randomQuoteRes = apiQuotes[randomIndex]
//DOM manipulation 
    //conditionally add long quote class
    if (randomQuoteRes.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = randomQuoteRes.text;
    quoteAuthor.textContent = (!randomQuoteRes.author) ? 'Unknown' : randomQuoteRes.author; //unknown author
}


//TWEET THE QUOTE
const tweetQuote = function() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${randomQuoteRes.text} - ${randomQuoteRes.author}`;
    window.open(twitterUrl, '_blank'); // _blank is parameter to open the window in a new tab
}

//event listeners
quoteBtn.addEventListener('click', randomQuote); //remember NOT TO CALL IMMEDIATELY USING ()
tweetBtn.addEventListener('click', tweetQuote);