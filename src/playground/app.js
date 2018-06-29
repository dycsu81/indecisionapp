class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);

        this.state = {
            options: props.options
        };
    }

    componentDidMount() {
        console.log("fetching data");
        try {
            const json = localStorage.getItem("options");
            const options = json ? JSON.parse(json) : [];
            this.setState(() => ({ options: options }));
        } catch (e) {

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length != this.state.options.length) {
            console.log("saving data");
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteSingleOption(option) {
        console.log("handleDeleteSingleOption", option);
        this.setState((prevState) => ({ 
            options: prevState.options.filter((op) => op !== option)
        }));
    }

    handleAddOption(option) {
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
        }

        this.setState((prevState) => ({
            options: prevState.options.concat([option])
        }));
    }

    handlePick() {
        console.log("handlePick");
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    render() {
        const title = "Indecision!";
        const subtitle = "Put your life in the hands of a computer";
        const btnActionTitle = "What should I do?";
        const btnAddOptionTitle = "Add Option";
        const btnRemoveAllTitle = "Remove All";
        return (
            <div>
                <Header 
                    title={title} 
                    subtitle={subtitle}
                />
                <Action 
                    title={btnActionTitle} 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteSingleOption}
                    btnTitle={btnRemoveAllTitle}
                />
                <AddOption 
                    title={btnAddOptionTitle} 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                {props.title}
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>{props.btnTitle}</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            <ol>
            {
                props.options.map((optionVal) => {
                    return <Option 
                        key={optionVal} 
                        optionVal={optionVal} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                })
            }
            </ol>
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            <li>{props.optionVal}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionVal);
                }}
            > 
            Remove
            </button>
            </li>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        if (!error) {
            e.target.elements.option.value = '';
        }

        this.setState(() => ({error: error}));
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>{this.props.title}</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));