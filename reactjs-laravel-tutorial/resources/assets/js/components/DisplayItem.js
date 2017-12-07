// DisplayItem.js

import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';

class DisplayItem extends Component {
  constructor(props) {
       super(props);
       this.state = {value: '', items: '', hasDeleted: false};

       // Need to bind the function
       this.updateHasDeleted = this.updateHasDeleted.bind(this);
       this.tabRow = this.tabRow.bind(this);
     }
      componentDidMount(){
        axios.get('http://localhost:8000/items')
          .then(response => {
            this.setState({ items: response.data, hasDeleted: false });
          })
          .catch(function (error) {
            console.log(error);
        })
      }
      updateHasDeleted(){
        this.setState({ hasDeleted: true });

        axios.get('http://localhost:8000/items')
          .then(response => {
            this.setState({ items: response.data, hasDeleted: false });
          })
          .catch(function (error) {
            console.log(error);
        })

        console.log(this.state);
      }
      tabRow(){
       if(this.state.items instanceof Array){
         const deleteCallback = this.updateHasDeleted;
         return this.state.items.map(function(object, i){
            //console.log(object);
            return <TableRow obj={object} key={object.id} deleteCallback={deleteCallback} />;
         })
       }
      }

  render(){
    return (
      <div>
        <h1>Items</h1>

        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/add-item">Create Item</Link>
          </div>
        </div><br />

        <table className="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
    </div>
    )
  }
}
export default DisplayItem;
