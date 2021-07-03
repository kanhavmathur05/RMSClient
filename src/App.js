import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import PolicyDocumentList from './components/PolicyDocumentList';
import UploadDocuments from './components/UploadDocuments';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
    return (
        <div className="App">

            <Router>
                <Header/>

                <Switch>
                    <Route path="/policydocumentlist" exact component={PolicyDocumentList}/>
                    <Route path="/uploaddocuments" exact component={UploadDocuments}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={SignUp}/>
                </Switch>
            </Router>

        </div>
    );
}

export default App;
