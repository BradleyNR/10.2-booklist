import React, {Component} from 'react';


class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
      imageFile: null,
      imagePreview: '',
      title: ''
    };
  }

  handleTitleChange = (e) => {
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  handleFilenameChange = (e) => {
    e.preventDefault();
    this.setState({filename: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let book = {
      filename: this.state.filename,
      pic: this.state.imageFile
    }

    let title = this.state.title;

    this.props.addBook(book, title);
    this.setState({filename: this.state.filename, imageFile: null, imagePreview: ''});
  }

  handleImagePreview = (e) => {
    e.preventDefault();
    // Process file
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({imageFile: file});
    console.log('file: ', file);

    // below we set it to base64 and here we set state!
    reader.onloadend = () => {
      this.setState({imagePreview: reader.result, filename: file.name});
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className='image-upload-area'>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleTitleChange} className='book-title' placeholder='Title' value={this.state.title}/>
          <input onChange={this.handleFilenameChange} className='image-filename' placeholder='Filename' value={this.state.filename}/>
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
