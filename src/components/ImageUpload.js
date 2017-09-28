import React, {Component} from 'react';


class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      imageFile: null,
      imagePreview: ''
    };
  }

  handleTitleChange = (e) => {
    e.preventDefault();
    this.setState({title: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let book = {
      title: this.state.title,
      pic: this.state.imageFile
    }

    this.props.addBook(book);
    this.setState({title: this.state.title, imageFile: null, imagePreview: ''})
  }

  handleImagePreview = (e) => {
    e.preventDefault();
    // Process file
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({imageFile: file});
    console.log(file);

    // below we set it to base64 and here we set state!
    reader.onloadend = () => {
      this.setState({imagePreview: reader.result});
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className='image-upload-area'>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleTitleChange} className='image-title' placeholder='Book Title' value={this.state.title}/>
          <input className='image-input' type='file' onChange={this.handleImagePreview} />
          <button type='submit' onClick={this.handleSubmit}>Upload Image</button>
        </form>
        <div className='image-preview-area'>
          <img src={this.state.imagePreview} alt='Book Cover'/>
        </div>
      </div>
    )
  }
}

export default ImageUpload;
