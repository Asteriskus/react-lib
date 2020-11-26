import React from 'react';
import { DndProvider, useDragLayer } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import employee from './mock/employee';

import Header from './components/header';
import DndList from './components/dndList';
import TinderLike from './components/tinderLike';

import './styles/global.less';

const App = () => {
    return <>
    <DndProvider backend={TouchBackend} options={opts}>
        <Header text={'ChooseApp'} />
        <div className="appContainer">
            {/* <DndList items={employee} className="dndList"/> */}
            <TinderLike items={employee} />
        </div>
    </DndProvider>
    </>
};

const opts = {
    enableMouseEvents: true,
};

export default App;