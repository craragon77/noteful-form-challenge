import React, { Component } from 'react'
//import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import NoteErrorBoundries from './NoteErrorBoundries';

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }
  constructor(props){
    super(props);
    this.nameValue = React.createRef();
    this.contentValue = React.createRef();
    //this.handleClicks = this.handleClicks.bind(this)
    //this.onSubmit = this.handleClicks.bind(this)
  }
  handleChange(e){
    this.setState({
      nameValue: e.target.value,
      contentValue: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const name = this.nameValue.current.value
    const content = this.contentValue.current.value
    const time = new Date()
    console.log('this is the title of the note: ' + name + ' , and its contents are as follows: ' + content + ' , and the time is: ' + time)
    const url = 'http://localhost:9090/notes';
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name}),
      body: JSON.stringify({modified: time}),
      body: JSON.stringify({content: content})
    }
    fetch(url, params)
      .then(response => {
        if(!response.ok){
          throw new Error('Something went wrong, try again later')
        }
        return response.json()
      })
      .then(data => {
        console.log(url, params)
        this.setState({
          nameValue: '',
          contentValue: '',
        })
      })
        .catch(error => {
          alert('Something went wrong. Try again later')
        })
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
              <input type='text' id='note-name-input' ref={this.nameValue} onChange = {e => this.handleChange(e)}/>
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea id='note-content-input' ref={this.contentValue}/>
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select'>
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
