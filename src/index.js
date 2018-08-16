import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Hukleberry Finn',
                'Life on the Mississippi',
                'Roughing it']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconard.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttirbution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorceres Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttirbution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttirbution: 'Pinguino',
        books: ['David Copperfield', 'A tale of two cities']
    },
    {
        name: 'William Shakespear',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'macbeth', 'Romeo and Juliet']
    }
    
];

function getTurnData(authors) {

    // Collection of all books
    // cehck this example : https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_reduce2
    const allBooks = authors.reduce(function(p, c, i) {
        return p.concat(c.books);
    }, []);

    // Select random four books
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    // based on the random selection of books , author gets choosed here
    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
        author.books.some((title) => title === answer))
    }
}

let state = {
//     turnData: {
//     author: authors[0],
//     books: authors[0].books
// }
turnData: getTurnData(authors),
highlight: ''
};

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}


function App() {
    return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected} 
    onContinue={()=> { 
        state = resetState();
        render();
    }}/>; 
}

/*function Authorwrapper() {
    // return <AddAuthorForm onAddAuthor = {console.log}/> 
    return <AddAuthorForm onAddAuthor = {(author) => {
        authors.push(author);
    }}/> 
}*/

const Authorwrapper = withRouter(({history}) => 
    // return <AddAuthorForm onAddAuthor = {console.log}/> 
    <AddAuthorForm onAddAuthor = {(author) => {
        authors.push(author);
        history.push('/'); 
    }}/> 
);

function render() {
    ReactDOM.render(<BrowserRouter>
       <React.Fragment>
         <Route exact path="/" component={App} />
         <Route exact path="/add" component={Authorwrapper} />
         </React.Fragment>
        </BrowserRouter>, document.getElementById('root'));
    // ReactDOM.render(<App />, document.getElementById('root'));
}
render();
registerServiceWorker();
