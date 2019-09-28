import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      text: "",
      name: "",
    }
    this.pickQuote = this.pickQuote.bind(this);
  }

  pickQuote() {
    /*pick a random quote from the list of quotes and set the quote and author
    in the react state*/
    this.randomQuote(this.state.quotes);
  }

  randomQuote(quoteList) {
    let listLength = quoteList.length;
    let randIndx = Math.floor(Math.random() * listLength);
    let quoteObj = quoteList[randIndx];
    this.setState({
      text: quoteObj["quote"],
      name: quoteObj["author"],
    })
  }

  componentWillMount() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
         {credentials: "omit"})
      .then(response => response.json())
      .then(data => this.setState({quotes: data.quotes}, function () { this.randomQuote(this.state.quotes)}));
  }



  render() {
    return(
      <div id="quote-box" class="container">
        < QuoteDisplay quote={this.state.text} author={this.state.name} click={this.pickQuote} />
      </div>
    )
  }
}

class QuoteDisplay extends React.Component {

  render() {

    const tweet = "https://www.twitter.com/intent/tweet?text=".concat("\"" + this.props.quote + "\"" + " - " + this.props.author);
    return(
      <div class="container">
        <div class="col">
          <div class="row">
            <blockquote id="text" class="blockquote">
              <p class="h3">"{this.props.quote}"</p>
              <footer id="author" class="blockquote-footer text-right">{this.props.author}</footer>
            </blockquote>
          </div>
        </div>
        <div class="buttons">
          <button id="new-quote" type="button" class="btn btn-secondary btn-sm align-middle" onClick={this.props.click} >Pick New Quote</button>
          <a href={tweet} class="button" id="tweet-quote" title="Tweet this quote!" rel="noopener noreferrer" target="_blank"><i class="fa fa-twitter btn-small align-middle"></i></a>
        </div>
      </div>
    )
  }
}

export default App;
