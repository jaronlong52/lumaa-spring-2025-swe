import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Tasks from './pages/tasks';

export default function Page_routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/tasks' element={<Tasks/>}></Route>
            </Routes>
        </BrowserRouter>
    )
};