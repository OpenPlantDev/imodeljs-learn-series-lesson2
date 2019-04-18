import React, { Component } from 'react';
import socketio from 'socket.io-client';
import './App.css';
import {IComponent} from './models/component';
import {DataService} from './services/dataService';
import {ComponentsTable} from './components/ComponentsTable/ComponentsTable';
import { IWbsItem } from './models/wbsItem';
import { WbsItemsTable } from './components/WbsItemsTable/WbsItemsTable';
import {ApiError} from './models/apiError';

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

  onDeleteComponent = async(id: string) => {
    console.log(`In onDeleteComponent, id = ${id}`);
    this.dataService.deleteComponent(id);
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
          <ComponentsTable components={this.state.components}  onDelete={this.onDeleteComponent} />
          <WbsItemsTable items={this.state.wbsItems} onDelete={this.onDeleteWbsItem} />
        <div>
        </div>
      </div>
    );
  }
}

export default App;
