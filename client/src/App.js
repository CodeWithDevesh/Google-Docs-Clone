import TextEditor from "./TextEditor";
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'
import {v4 as uuidV4} from "uuid"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element = {<Navigate from="/" to={`/documents/${uuidV4()}`}/>}>
        </Route>

        <Route path="/documents/:id" element = {<TextEditor/>}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
