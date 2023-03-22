const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const TwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function finished_loading(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show new Quote
function newQuote(){
    loading();
    // Picking random Quote in Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Checking if quote has an author -> if not -> set author to 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    //Giving long quotes smaller font-sizes
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader 
    quoteText.textContent = quote.text;
    finished_loading();
}

// Tweet Quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}


// Get quotes from API
async function getQuotes(){
    loading();
    const APIURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(APIURL);
        apiQuotes = await response.json();
        newQuote();
    }catch (err){
        console.log(err)
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
TwitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
