import React, { Component } from 'react'
//import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import NoteErrorBoundries from './NoteErrorBoundries';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import API_KEY from '../config'
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
    //this.backToHome = this.backToHome.bind(this)
    //this.submitAndGoHome = this.submitAndGoHome.bind(this)
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

 // backToHome(e){
   // this.props.history.push('/')
  //}

  newAddedNote(newNote) {
    const notesUrl = 'https://noteful-repo.now.sh';
    const params = {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    }
    fetch(notesUrl, params)
    .then(response => {
      if(!response.ok){
        throw new Error('Something went wrong, try again later')
      }
      return (response.json());
    })
    .then(data => {
        this.props.updateNotes(data) // lets call this function
    })
    .catch(error => {
      alert('Something went wrong. Try again later')
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
    const testingTwo = {
      "folderId": testing.folderIdValue,
      "name": testing.nameValue,
      "modified": testing.time,
      "content": testing.contentValue
    }
    if (folderIdValue === ''){
      alert('please select a folder' )
    } else (
      this.newAddedNote(testingTwo)
    )
    
  }

  //submitAndGoHome(e){
  //  this.handleSubmit(e)
  //  this.backToHome(e)
  //}


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