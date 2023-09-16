import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<BrowserRouter>
			<Dashboard />
			<Toaster />
		</BrowserRouter>
	);
}

export default App;
