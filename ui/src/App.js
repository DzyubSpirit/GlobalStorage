import React, { Component } from 'react';
import './App.css';
import gs from '../../';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
} from 'material-ui/Table';

class App extends Component {
  constructor() {
    super();
    this.provider = new gs.LocalstorageProvider();
    this.state = { items: [], updating: false, providerId: 1 };
    this.deleteItem = this.deleteItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.updateItemList = this.updateItemList.bind(this);
    this.providerChange = this.providerChange.bind(this);
    this.provider.open({}, () => {
      process.nextTick(() => this.updateItemList());
    });
  }

  updateItemList() {
    const newState = this.state;
    newState.updating = true;
    const animationStartTime = Date.now();
    this.setState(newState);
    this.provider.select({}).fetch((err, items) => {
      if (err) return console.log('Error: ', err);
      const newState = this.state;
      newState.items = items;
      if (Date.now() - animationStartTime > 1000) {
        newState.updating = false;
      } else {
        setTimeout(() => {
          const newState = this.state;
          newState.updating = false;
          this.setState(newState);
        }, 1000);
      }
      this.setState(newState);
    });
  }

  deleteItem(id) {
    this.provider.delete(id);
    this.updateItemList();
  }

  createItem() {
    this.provider.create({}, (err) => {
      if (err) return console.log('Error creating item: ', err);
      this.updateItemList();
    });
  }

  changeItem(text) {
    try {
      const obj = JSON.parse(text);
      this.provider.update(obj, (err) => {
        if (err) return console.log("Error updating item: ", err);
        this.updateItemList();
      });
    } catch (err) {
      console.log("Error parsing object: ", err);
    }
  }

  raws() {
    return this.state.items.map(item => (
      <Item key={item.id} item={item}
        deleteItem={this.deleteItem}
        saveItem={this.changeItem}
      />
    ));
  }

  providerChange(event, index, providerId) {
    const newState = this.state;
    newState.providerId = providerId;
    this.setState(newState);
  }

  render() {
    const style = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
        margin: '20px',
      },
    };
    return (
      <div className="App">
        <SelectField
          floatingLabelText="Provider"
          value={this.state.providerId}
          onChange={this.providerChange}
        >
          <MenuItem value={1} primaryText="Localstorage" />
          <MenuItem value={2} primaryText="IndexedDB" />
          <MenuItem value={3} primaryText="PostgreSQL" />
          <MenuItem value={4} primaryText="MySQL" />
          <MenuItem value={5} primaryText="MongoDB" />
          <MenuItem value={6} primaryText="Memory" />
          <MenuItem value={7} primaryText="Filesystem" />
          <MenuItem value={8} primaryText="Remote" />
        </SelectField>
        <Divider />
        <h1>Query:</h1>
        <TextField id="query-editor" multiLine={true} />
        <br />
        <RaisedButton label="Run" primary={true} style={ { margin: '15px' } } />
        <Divider />
        <h1> Data </h1>
        <Table className="data-table">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Id:</TableHeaderColumn>
              <TableHeaderColumn>Item:</TableHeaderColumn>
              <TableHeaderColumn>Actions:</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displaySelectAll={false}>
            {this.raws()}
          </TableBody>
        </Table>
        <RaisedButton label="Create" primary={true} onClick={this.createItem} />
        <RefreshIndicator percentage={100} size={50} left={20} top={15}
          color="red" status={this.state.updating ? "loading" : "ready"}
          style={style.refresh}
          onClick={this.updateItemList}
        />
      </div>
    );
  }
}

class Item extends Component {
  constructor() {
    super();
    this.state = { changeMode: false };

    this.deleteItem = this.deleteItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }

  deleteItem() {
    this.props.deleteItem(this.props.item.id);
  }

  changeItem() {
    this.setState({
      changeMode: true,
      text: JSON.stringify(this.props.item),
    });
  }

  onItemChange(e) {
    this.setState({
      changeMode: true,
      text: e.target.value,
    });
  }

  saveItem() {
    this.setState({ changeMode: false });
    this.props.saveItem(this.state.text);
  }

  render() {
    const style = {
      margin: '12px',
    };
    return (
      <tr>
        <td>{this.props.item.id}</td>
        { this.state.changeMode ?
          <td>
            <TextField type="textarea"
              value={this.state.text}
              onChange={this.onItemChange}
              multiLine={true}
            />
          </td> :
          <td className="object-data">{JSON.stringify(this.props.item)}</td>
        }
        <td>
          { this.state.changeMode ?
            <RaisedButton label="save" primary={true}
              onClick={this.saveItem} /> :
            <RaisedButton label="change" primary={true}
              onClick={this.changeItem} />
          }
          <RaisedButton label="delete" secondary={true}
            style={style}
            onClick={this.deleteItem} />
        </td>
      </tr>
    );
  }
}

/*
          { this.state.changeMode
          ? <input type="button" value="save"
            onClick={this.saveItem} />
          : <input type="button" value="change"
            onClick={this.changeItem} />
          }
*/


export default App;
