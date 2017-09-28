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
      imageJustUploadedUrl: ''
    };
  }

  addBook = (bookData) => {
    console.log(bookData);


    fetch(PARSE_URL + '/files/' + bookData.title, {
      headers: HEADERS,
      // only pass binary data
      body: bookData.pic,
      method: 'POST'
    }).then((resp) => {
      return resp.json();
    }).then((message) => {
      console.log('book posted ', message);
      this.setState({imageJustUploadedUrl: message.url})
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
