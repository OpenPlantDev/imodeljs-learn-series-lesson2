import React, { Component } from 'react';
import socketio from 'socket.io-client';
import './App.css';
import {IComponent} from './models/component';
import {DataService} from './services/dataService';
import {ComponentsTable} from './components/ComponentsTable/ComponentsTable';
import { IWbsItem } from './models/wbsItem';
import { WbsItemsTable } from './components/WbsItemsTable/WbsItemsTable';

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

  async updateData() {
    const components: IComponent[] = await this.dataService.fetchComponents();
    console.log(components);

    const wbsItems = await this.dataService.fetchWbsItems();
    console.log(wbsItems);

    this.setState({components, wbsItems})

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
      <div className="App">
        <header className="App-header">
          Data Fetch
        </header>
          <ComponentsTable components={this.state.components} />
          <WbsItemsTable items={this.state.wbsItems} />
        <div>
        </div>
      </div>
    );
  }
}

export default App;
