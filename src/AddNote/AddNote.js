import React, { Component } from 'react'
//import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import NoteErrorBoundries from './NoteErrorBoundries';
import propTypes from 'prop-types'

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }
  constructor(props){
    super(props);
    this.state = {
      name: '',
      content: '',
      selectedFolder: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleNameChange(e){
    this.setState({
      name: e.target.value,
    })
  }
  handleContentChange(e){
    this.setState({
      content: e.target.value
    })
  }
  onFolderSelect(e){
    this.setState({
      selectedFolder: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    //console.log(this.props.folders)
    const nameValue = this.state.name
    const contentValue = this.state.content
    const time = new Date()
    const folderIdValue = this.state.selectedFolder
    console.log(folderIdValue);
    const testing = {nameValue, contentValue, time, folderIdValue}
    console.log('this is the title of the note: ' + nameValue + 
    ' , and its contents are as follows: ' + contentValue + 
    ' , and the time is: ' + time + 
    ' , and the folder id is: ' + folderIdValue);
    const url = 'http://localhost:9090/notes';
    const testingTwo = {
      "folderId": testing.folderIdValue,
      "name": testing.nameValue,
      "modified": testing.time,
      "content": testing.contentValue
    } 
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testingTwo)
    }
    
    if (folderIdValue === ''){
      alert('please select a folder into which this note can live')
    }
     else (
       fetch(url, params)
      .then(response => {
        if(!response.ok){
          throw new Error('Something went wrong, try again later')
        }
        return (response.json());
      })
      .then(data => {
        this.setState({
          name: '',
          content: '',
          selectedFolder: ''
        })
      })
        .catch(error => {
          alert('Something went wrong. Try again later')
        })
     )
    }
  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        {/*<NotefulForm>*/}
        <NoteErrorBoundries>
          <form onSubmit = {e => this.handleSubmit(e)}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' name={this.state.name} onChange = {e => this.handleNameChange(e)} required/>
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea id='note-content-input' content={this.state.content} onChange = {e => this.handleContentChange(e)} required/>
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select required id='note-folder-select' onChange = {e => this.onFolderSelect(e)} selectedFolder={this.state.selectedFolder}>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <button type='submit'>
                Add note
              </button>
            </div>
          </form>
        </NoteErrorBoundries>

      {/*</NotefulForm>*/}
      </section>
          
    )
  }
}

AddNote.propTypes = {
  nameValue: propTypes.string,
  contentValue: propTypes.string,
  folderIdValue: propTypes.number.isRequired
}
