import React, { Component } from 'react';

import ImageUpload from './ImageUpload.js';
import BookArea from './BookArea.js';

import PARSE_URL, {HEADERS} from '../parse.js';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      imageJustUploadedUrl: '',
      lastTitle: '',
      bookList: [
        {title: 'seed data', url: 'https://static.pexels.com/photos/34950/pexels-photo.jpg'}
      ]
    };
  }

  // grabbing data from server and passing to bookarea
  componentDidMount(){
    fetch(PARSE_URL + '/classes/books/', {
      headers: HEADERS
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('data: ', data.results);
      this.setState({bookList: data.results})
    })
  }


  // upload book to parse, then upload book url + other data to different collection
  addBook = (bookData, title) => {
    console.log(bookData);
    fetch(PARSE_URL + '/files/' + bookData.filename, {
      headers: HEADERS,
      // only pass binary data
      body: bookData.pic,
      method: 'POST'
    }).then((resp) => {
      return resp.json();
    }).then((message) => {
      console.log('book posted ', message);
      this.setState({imageJustUploadedUrl: message.url, lastTitle: title })

      //take img url and title and upload to books collection once image is uploaded correctly
      fetch(PARSE_URL + '/classes/books', {
        headers: HEADERS,
        body: JSON.stringify({title: this.state.lastTitle, imgUrl: this.state.imageJustUploadedUrl}),
        method: 'POST'
      }).then((resp) => {
        return resp.json();
      }).then((message) => {
        let bookArray = this.state.bookList;
        bookArray.push({title: this.state.lastTitle, imgUrl: this.state.imageJustUploadedUrl});
        this.setState({bookList: bookArray, title: '', imgUrl: ''})
      });
    });
  }


  render() {
    return(
      <div className='container-fluid'>
        <ImageUpload addBook={this.addBook} />
        <BookArea bookList={this.state.bookList}/>
      </div>
    )
  }
}

export default Main;
