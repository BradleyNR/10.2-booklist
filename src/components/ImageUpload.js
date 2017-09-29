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
      <div className='row search-area'>
          <div className='image-form col-md-12'>
            <div className='col-md-8'>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor='title' className='col-md-12 label-name'>Book Title:</label>
                <input onChange={this.handleTitleChange} className='book-title col-md-12' id='title' placeholder='Title' value={this.state.title}/>
                <label htmlFor='cover' className='col-md-12 label-name'>Book Cover:</label>
                <input onChange={this.handleFilenameChange} className='image-filename col-md-8' id='cover' placeholder='Filename' value={this.state.filename}/>
                <input className='image-input col-md-4' type='file' onChange={this.handleImagePreview} />
                <button type='submit' className='col-md-6 btn btn-primary upload-button' onClick={this.handleSubmit}>Upload Image</button>
              </form>
            </div>

            <div className='image-preview-area col-md-3'>
              {this.state.imagePreview ? <img src={this.state.imagePreview} className='col-md-12' alt='Book Cover'/> : null}
            </div>

          </div>
      </div>
    )
  }
}

export default ImageUpload;
