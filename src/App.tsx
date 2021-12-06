import './App.less';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './router';

function App() {
    return (
        <main>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </main>
    );
}

export default App;
