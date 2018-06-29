import React from 'react';
import Options from './Options';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    
    // constructor(props) {
    //     super(props);

    //     this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    //     this.handlePick = this.handlePick.bind(this);
    //     this.handleAddOption = this.handleAddOption.bind(this);
    //     this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);

    //     this.state = {
    //         options: props.options
    //     };
    // }

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

    handleDeleteOptions = ()  => {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteSingleOption= (option)  => {
        console.log("handleDeleteSingleOption", option);
        this.setState((prevState) => ({ 
            options: prevState.options.filter((op) => op !== option)
        }));
    }

    handleAddOption = (option)  => {
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
        }

        this.setState((prevState) => ({
            options: prevState.options.concat([option])
        }));
    }

    handlePick = ()  => {
        console.log("handlePick");
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    }

    handleSelectOptionClear = () => {
        this.setState(() => ({ selectedOption: undefined }));
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
                <div className="container">
                    <Action 
                        title={btnActionTitle} 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
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
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleSelectOptionClear={this.handleSelectOptionClear}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};