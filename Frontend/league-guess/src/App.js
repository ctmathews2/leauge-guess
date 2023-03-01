import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import ShowMatch from './components/ShowMatch';

const App = () => {
  return (
    <Router>
      <div style={{height: '100%'}}>
        <Routes>
          <Route exact path='/' element={<ShowBookList />} />
          <Route exact path='/matches' element={<ShowMatch />} />
          <Route path='/create-book' element={<CreateBook />} />
          <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;