import React, { Component } from 'react'
//import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'

export default class AddFolder extends Component {
  submitForm(e) {
      e.preventDefault();
      const folderName = e.target.value;
      console.log('the folder name is: ' + folderName);
      console.log(e.target.value)
      }
    render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        {/*<NotefulForm>*/}
        <form>
          <div className='field'>
            <label htmlFor='folder-name-input' value='name'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name-input' ref={this.nameInput}/>
          </div>
          <div className='buttons'>
            <button type='submit' onClick = {e => this.submitForm(e)}>
              Add folder
            </button>
          </div>
        </form>
        {/*</NotefulForm>*/}
      </section>
    )
  }
}
