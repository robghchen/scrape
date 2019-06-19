import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import "./App.css";

class App extends Component {
  state = { quotes: [], authors: [] };

  componentDidMount() {
    rp("https://cors-anywhere.herokuapp.com/http://www.eduro.com/")
      .then(html => {
        let quotes = [];
        let authors = [];
        // console.log(html);
        let $ = cheerio.load(html);
        $("dailyquote div p").each(function(i, element) {
          let quote = $(this)
            .prev()
            .text()
            .trim();
          if (quote !== "") {
            quotes.push(quote);
          }
        });
        $("dailyquote div .author").each(function(i, element) {
          let author = $(this)
            .prepend()
            .text();
          authors.push(author);
        });

        this.setState({ quotes, authors });
      })
      .catch(function(err) {
        console.log("crawl failed");
      });
  }

  render() {
    const { authors, quotes } = this.state;
    let authorQuotes = [];
    let authorQuote = {};
    for (let i = 0; i < quotes.length; i++) {
      authorQuote = { author: authors[i], quote: quotes[i] };
      authorQuotes.push(authorQuote);
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ textAlign: "center" }}>Quotes</h1>
        <br />
        <ul style={{ margin: "auto" }}>
          {authorQuotes.map(authorQuote => {
            return (
              <li key={authorQuote.quote}>
                <span>
                  <p>{authorQuote.quote}</p>
                  <p>{authorQuote.author}</p>
                </span>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
