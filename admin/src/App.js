import logo from './logo.svg';
import './App.css';
import Add from './pages/Add/Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from './pages/List/List';
import MiniDrawer from './components/Appbar/MiniDrawer';
function App() {
  return (
    <div className="App">
      <ToastContainer/>
     {/* <List/>
<Add/> */}
<MiniDrawer/>

    </div>
  );
}

export default App;
