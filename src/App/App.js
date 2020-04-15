import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import './App.css'
import {withRouter} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
    
    this.newAddedFolder = this.newAddedFolder.bind(this)
    this.newAddedNote = this.newAddedNote.bind(this)
}
state = {
      notes: [],
      folders: [],
    }

  componentDidMount(){
    fetch('http://localhost:9090/folders')
      .then(response => response.json())
      .then(data =>{ 
        const getFolders = data
        this.setState({
          folders: getFolders
        })
      })
      .catch(error => {
        console.log('idk whats up with the folders, try again later #catch')
      })
      fetch('http://localhost:9090/notes')
      .then(response => response.json())
      .then(data => {
        const getNotes = data
        this.setState({
          notes: getNotes
        })
      })
      .catch(error => {
        console.log('idk whats up with the notes, try again later #catch')
        console.log(error)
      })
  }

  newAddedNote(newNote) {
    const notesUrl = 'http://localhost:9090/notes';
    const params = {
      method: 'POST',
      headers: {
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
      this.setState({note: [...this.state.notes, data]});
    })
    .then(e => {
        this.props.history.push('/add')
    })
    .catch(error => {
      alert('Something went wrong. Try again later')
    })
  }

  updateFolders = (newFolders) => {
    let foldersClone  = JSON.parse(JSON.stringify(this.state.folders))
    foldersClone.push(newFolders)
    this.setState({
      folders: foldersClone
    }, () => {
      this.props.history.push('/')
    })
  }

  handleAddNote = (newNote) => {
    this.setState({
      'id': '',
      'name': '',
      'folder': '',
      'content': ''
    })
  }

  updateNotes = (newNote) => {
    let notesClone = JSON.parse(JSON.stringify(this.state.notes))
    notesClone.push(newNote) 
    this.setState({
         notes: notesClone
    }, () => {
        this.props.history.push('/')
    })
}

  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state
    return (
      <div>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          render = {() => 
                <AddFolder updateFolders = {this.updateFolders}
                  getRequest= {this.getRequest}
                  newAddedNote = {this.newAddedFolder}
                  {...routeProps}
                    folders = {folders}
                 />
           }>
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote 
        updateNotes = {this.updateNotes } getRequest = {this.getRequest} newAddedNote = {this.newAddedNote}
                {...routeProps}
                folders={folders}
              />
            )
          }}
        />
     </div>
     )
  render() {
    return (
      <div className='App'>
        <nav className='App__nav'>
          {this.renderNavRoutes()}
        </nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
            {' '}
            <FontAwesomeIcon icon='check-double' />
          </h1>
        </header>
        <main className='App__main'>
          {this.renderMainRoutes()}
        </main>
      </div>
    )
  }
}

export default withRouter(App)