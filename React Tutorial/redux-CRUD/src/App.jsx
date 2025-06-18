import './App.css'
import { Route, Routes } from 'react-router';
import Header from './Components/Header';
import AddBook from './Components/AddBook';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import EditBook from './Components/EditBook';

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-book' element={<AddBook />} />
        <Route path='/edit-book/:id' element={<EditBook />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;