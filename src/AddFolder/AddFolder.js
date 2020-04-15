import React, { Component } from 'react';
//import NotefulForm from '../NotefulForm/NotefulForm';
import './AddFolder.css';
import FolderErrorBoundries from './FolderErrorBoundries';
import propTypes from 'prop-types';

export default class AddFolder extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.newAddedFolder = this.handleSubmit.bind(this)
  }
  
  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }
  
  handleSubmit(e){
    e.preventDefault()
    const folderName = this.state.value;
    console.log('the folder name is: ' + folderName)
    this.props.newAddedFolder(folderName)
  }

  newAddedFolder(newFolder) {
    const folderUrl = 'http://localhost:9090/folders'
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFolder)
      }
      fetch(folderUrl, params)
      .then(response =>{
        if (!response.ok){
          throw new Error('Something went wrong, try again later')
        }
        return (response.json())
      })
      .then(data => {
        this.props.updateFolders(data)
      })
  }
    render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        {/*<NotefulForm>*/}
        <FolderErrorBoundries>
          <form onSubmit = {e => this.handleSubmit(e)}>
            <div className='field'>
                <label htmlFor='folder-name-input' value='name'>
                Name
              </label>
              <input type='text' id='folder-name-input' name='folder-name-input' value={this.state.value} onChange={this.handleChange} required/>
            </div>
            <div className='buttons'>
              <button type='submit'>
                Add folder
              </button>
            </div>
          </form>
        </FolderErrorBoundries>
        {/*</NotefulForm>*/}
      </section>
    )
  }  
}

AddFolder.propTypes = {
  value: propTypes.string.isRequired
}