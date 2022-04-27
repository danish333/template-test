const quoteContainer = document.getElementById("qoute-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuote = [];



// loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//remove loader
function removeLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// get new quote
function newQuote() {
    loading();
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    if (!quote.author) {
        authorText.textContent = "Unknow";
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 50) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent = quote.text;
    removeLoading()
}
// fetching data
async function getquote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    } catch (error) {
        // error
    }
}
// share on twitter
function twitterQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent};`
    window.open(twitterUrl, '_blank');
}
// calling function
getquote();
// listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', twitterQuote);