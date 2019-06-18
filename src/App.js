import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";

class App extends Component {
  state = { quotes: [] };

  componentDidMount() {
    rp("https://cors-anywhere.herokuapp.com/http://www.eduro.com/")
      .then(html => {
        let quotes = [];
        // console.log(html);
        let $ = cheerio.load(html);
        $("dailyquote div p").each(function(i, element) {
          let a = $(this)
            .prev()
            .text();
          if (a !== "") {
            quotes.push(a);
          }
        });

        this.setState({ quotes });
      })
      .catch(function(err) {
        console.log("crawl failed");
      });
  }

  render() {
    const { quotes } = this.state;
    return (
      <div>
        <h1>Quotes</h1>
        <ul>
          {quotes.map(quote => {
            return (
              <li key={quote}>
                <p>{quote}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
