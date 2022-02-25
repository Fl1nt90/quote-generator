const quoteBtn = document.getElementById('new-quote') //select by id/select id
const tweetBtn = document.getElementById('twitter') 
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');

let apiQuotes = []; //global variable where to ajax call response
let randomQuoteRes = {} //store the random quote

// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json() //store the response into a global variable
    //immediately show a quote
        randomQuote();
    } catch (err) {
        console.log(err);
    }
}
//make the AJAX call at runtime
getQuotes();

//pick one random quote and print on the screen
const randomQuote = function() {
    const randomIndex = Math.floor(Math.random() * apiQuotes.length);
    randomQuoteRes = apiQuotes[randomIndex]
    console.log(randomIndex);
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
