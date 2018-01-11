class UserCompany extends React.Component{
    constructor() {
        super();
        this.state = {
            company: 'Unknown'
        }
    }

    componentDidMount() {
        axios({
            url: 'https://api.github.com/prateek3189',
            method: 'post',
            data: {
                query: '{ user(login: "prateek3189") { company } }'
            },
            headers: {
                Authorization: 'bearer e2fc4be8c0e7121f75c92c0ca766744bdf3f7c18'
            }
        }).then(response => {
            this.setState({company: response.data.data.user.company})
        });
    }

    render() {
        return (
            <div>{this.state.company}</div>
        );
    }
}

function renderApp() {
    ReactDOM.render(
        <UserCompany />,
        document.getElementById('root')
    );
}

renderApp();
