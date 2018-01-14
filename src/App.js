import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    let query = event.target.search_text.value;
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`)
      .then(response => {
        let results = response.data.query.search;
        console.log(response.data.query.search);
        this.setState({ results: results })
      })
    event.target.search_text.value = "";
  }

  render() {
    return (
      <div className="container">
        {/* <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Special:Random"><button className="random">Click here for random knowledge</button></a> */}
        <a className="random" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Special:Random">Click here for random knowledge</a>
        <form className="form" onSubmit={this.onSubmit}>
          <input className="input" ype="text" name="search_text" />
          <button type="submit" className="search-button"><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
        </form>
        <div>
          {this.state.results ? this.state.results.map((article, i) => {
            return (
              <a className="article-link" href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                target="_blank"
                rel="noopener noreferrer">
                <div className="result-list" key={i}>
                  <p className="title">{article.title}</p>
                  <p className="snippet" dangerouslySetInnerHTML={{ __html: `${article.snippet} <i>. . . (Click for more)</i>` }} />
                </div>
              </a>
            )
          }) : null}
        </div>
      </div>
    );

  }
}

export default App;
