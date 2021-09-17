import { FileUpload } from './components/FileUpload';
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <h4 className='text-center mb-4 display-4'>
      <i className='fab fa-react'> </i> React file Upload
    </h4>
    <FileUpload />
  </div>
);

export default App;
