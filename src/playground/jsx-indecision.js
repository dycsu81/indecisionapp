console.log('App.js is running!');
//JSX - Javascript XML


const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
};

const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler");
    const option = e.target.elements.option.value;
    console.log(option);
    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp();
    }
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
const onRemoveAll = () => {
    
    app.options = [];
    renderApp();
};

const onMakeDecision = () => {
    console.log("onMakeDecision");
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};

const appRoot = document.getElementById('app');

const renderApp = () => {

    var template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
            {
                app.options.map((option) => <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={submitHandler}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
};

renderApp();