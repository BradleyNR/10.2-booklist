import React, {Component} from 'react';


class BookArea extends Component {
  constructor(props){
    super(props);

    this.state = {
      hidden: 'book-covers col-md-8 hidden'
    }
  }

  handleTitleClick = (e) => {
    e.preventDefault();
    if (this.state.hidden === 'book-covers col-md-8 hidden') {
      this.setState({hidden: 'book-covers col-md-8'})
    } else {
      this.setState({hidden: 'book-covers col-md-8 hidden'})
    }
  }

  render(){

    let bookArray = this.props.bookList;
    let books = bookArray.map((item, index) => {
      return(
        <div key={item.objectId} className='col-md-12 individual-book'>
          <h2 className='col-md-4'>{item.title}</h2>
          <img className={this.state.hidden} src={item.imgUrl}></img>
        </div>

      )
    });

    return(
      <div className='row book-area'>
        <div className='col-md-10 col-md-offset-1'>
          <h1 className='col-md-6'> Books: </h1>
          <h1 onClick={this.handleTitleClick} className='col-md-6 show-covers-button'>Show Me Covers</h1>
          {books}
        </div>
      </div>
    )
  }
}

export default BookArea;
