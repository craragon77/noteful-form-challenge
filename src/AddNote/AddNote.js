import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'

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
    console.log('this is the title of the note: ' + name + ' and its contents are as follows: ' + content)
  }
  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        {/*<NotefulForm>*/}
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
            <button type='submit' onClick>
              Add note
            </button>
          </div>
        </form>
      {/*</NotefulForm>*/}
      </section>
          
    )
  }
}
