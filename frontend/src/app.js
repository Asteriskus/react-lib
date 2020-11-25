import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

import Header from './components/header';
import DndList from './components/dndList';

import './styles/global.less';

const App = () => {
    return <>
    <DndProvider backend={HTML5Backend}>
        <Header text={'ChooseApp'} />
        <div className="appContainer">
            <DndList />
        </div>
    </DndProvider>
    </>
};

export default App;