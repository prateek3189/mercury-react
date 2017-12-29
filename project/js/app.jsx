class Counter extends React.Component{
    constructor() {
        super();
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <button onClick={() => {
                this.setState({counter: this.state.counter + 1});
            }}>{this.state.counter}</button>

        );
    }
}

function renderApp() {
    ReactDOM.render(
        <Counter />,
        document.getElementById('root')
    );
}

renderApp();
