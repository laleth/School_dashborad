import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Studentdata from './components/Studentdata';
import Teacherinfo from './components/Teaceherdata';
import Navbared from './components/Navbar';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Navbared />
      <div className='school-text'>
        Welcome to Saratha School!!!
      </div>
      <div className='Content'>
        <Studentdata />
        <Teacherinfo />
        <div className="contact-container">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
