import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    state = {
        users: []
    };

    async componentDidMount() {
        const res = await fetch('http://localhost:1488/api/users');
        if (res.status !== 200) {
            console.log('Fuck');
            return;
        }

        const users = await res.json();
        this.setState({ users: users.users });
    }

    render() {
        const { users } = this.state;
        const usersObj = users.map(user => <div key={user.id}>{user.name}</div>);

        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    {usersObj}
                </header>
            </div>
        );
    }
}

export default App;
