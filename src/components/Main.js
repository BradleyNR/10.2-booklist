import React, { Component } from 'react';

import ImageUpload from './ImageUpload.js';

const HEADERS = {
  'X-Parse-Application-Id': 'carson',
  'X-Parse-REST-API-Key': 'naturarogue',
  'X-Parse-Revocable-Session': 1
}

const PARSE_URL = 'https://naturals-test-parse-server.herokuapp.com'

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

      //take img url and title and push into books collection once image is uploaded correctly
      fetch(PARSE_URL + '/classes/books', {
        headers: HEADERS,
        body: JSON.stringify({title: this.state.lastTitle, imgUrl: this.state.imageJustUploadedUrl}),
        method: 'POST'
      }).then((resp) => {
        return resp.json();
      }).then((message) => {
        console.log('message after book upload: ', message);
      });
    });
  }


  render() {
    return(
      <div>
        <h1> Testing </h1>
        <ImageUpload addBook={this.addBook} />
      </div>
    )
  }
}

export default Main;
