import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    React.useEffect(() => {
        axios.get('https://localhost:3000/employee?id=1')
        .then(res => console.log(res));
    }, [])
    return <div>
        <h1>It works</h1>
    </div>;
};

ReactDOM.render(React.createElement(App), document.getElementById('react-root'));