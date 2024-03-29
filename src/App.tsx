import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import socketio from 'socket.io-client';
import './App.css';
import {IComponent} from './models/component';
import {DataService} from './services/dataService';
import {ComponentsTable} from './components/ComponentsTable/ComponentsTable';
import { IWbsItem } from './models/wbsItem';
import { WbsItemsTable } from './components/WbsItemsTable/WbsItemsTable';
import {ApiError} from './models/apiError';
import {Home} from './components/Home/Home';

const apiUrl: string = 'http://localhost:4060'

interface IState {
  components: IComponent[];
  wbsItems: IWbsItem[];
}

class App extends Component<any, IState> {

  dataService: DataService;
  state: IState = {components: [], wbsItems: []};
  socketClient: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    this.dataService = new DataService(apiUrl);
    this.socketClient = socketio(apiUrl);
  }

   updateData = async () => {
    const compResult = await this.dataService.fetchComponents();
    if(compResult instanceof ApiError) {
      console.log(`Api Error - ${compResult.status}: ${compResult.message}`);
    } else {
      this.setState({components: compResult})
    }

    const wbsItemResult = await this.dataService.fetchWbsItems();
    if(wbsItemResult instanceof ApiError) {
      console.log(`Api Error - ${wbsItemResult.status}: ${wbsItemResult.message}`);
    } else {
      this.setState({wbsItems: wbsItemResult})
    }

  }

  onDeleteWbsItem = async(id: string) => {
    console.log(`In onDeleteWbsItem, id = ${id}`);
    this.dataService.deleteWbsItem(id);
  }

  onEditWbsItem = async(id: string) => {
    console.log(`In onEditWbsItem, id = ${id}`);
    console.log(`No yet implemented`);
  }

  onAddWbsItem = async() => {
    console.log(`In onAddWbsItem`);
    console.log(`No yet implemented`);
  }



  onDeleteComponent = async(id: string) => {
    console.log(`In onDeleteComponent, id = ${id}`);
    this.dataService.deleteComponent(id);
  }

  onEditComponent = async(id: string) => {
    console.log(`In onEditComponent, id = ${id}`);
    console.log(`No yet implemented`);
  }

  onAddComponent = async() => {
    console.log(`In onAddComponent`);
    console.log(`No yet implemented`);
  }

  async componentDidMount() {
    this.updateData();

    this.socketClient.on("DbUpdated", async(data: any) => {
      console.log("received DbUpdated event");
      await this.updateData();
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <ul>
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/components">Components</Link></li>
                <li><Link className="link" to="/wbsItems">WBS</Link></li>
              </ul>
            </nav>
          </header>
          <div className="App-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/components" render={((props) => 
                <ComponentsTable components={this.state.components}  
                onDelete={this.onDeleteComponent} 
                onEdit={this.onEditComponent} 
                onAdd={this.onAddComponent}/>
              )} />
            <Route exact path="/wbsitems" render={((props) => 
                <WbsItemsTable items={this.state.wbsItems} 
                  onDelete={this.onDeleteWbsItem} 
                  onEdit={this.onEditWbsItem} 
                  onAdd={this.onAddWbsItem} />
             )} />
        </Switch>
          </div>
      </div>
    </Router>
    );
  }
}

export default App;
