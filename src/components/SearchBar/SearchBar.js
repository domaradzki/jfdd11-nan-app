import React, { Component } from "react";
import { Input, Form } from "semantic-ui-react";
import "./SearchBar.css";
import { getPackagesPromise } from "../../services";





class SearchBar extends Component {
  state = {
    searchPhrase: "",
    parcel: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    getPackagesPromise().then(data => {
      this.setState({
        parcel:
          data.find(parcel => parcel.id === this.state.searchPhrase) || null
      });
    });
  };
  handleChange = event => {
    this.setState({
      searchPhrase: "-" + event.target.value
    });
  };

  


  render() {
    const { parcel } = this.state;
    return (
      <>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input
                onChange={this.handleChange}
                className="search-bar"
                action="Search"
                placeholder="Enter package number"
              />
            </Form.Field>
          </Form>
        </div>
        <DetailsTable/>
        <div className="parcel-details">
          {parcel === "" && <p style={{ textAlign: "center" }} />}
          {parcel === null && (
            <p style={{ textAlign: "center" }}>"Incorrect package number "</p>
          )}
          {parcel && (
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Sending Date</th>
                  <th>Status</th>
                  <th>Courier ID</th>
                  <th>Delivery Date</th>
                  <th>Dimensions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{parcel.date_send}</td>
                  <td
                    style={{
                      color:
                        parcel.status === "received"
                          ? "#006622"
                          : parcel.status === "send"
                          ? "#0099ff"
                          : "#e68a00"
                    }}
                  >
                    {parcel.status}
                  </td>
                  <td>{parcel.courier_id}</td>
                  <td>{parcel.date_delivery}</td>
                  <td>
                    depth(mm): {parcel.dimensions.depth}
                    <br />
                    height(mm): {parcel.dimensions.height}
                    <br />
                    width(mm): {parcel.dimensions.width}
                    <br />
                    weight(kg): {parcel.dimensions.weight}
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
};

class DetailsTable extends Component { 
  render(){
    const { parcel } = this.props;
    return (
 <div className="parcel-details">
 {parcel === "" && <p style={{ textAlign: "center" }} />}
 {parcel === null && (
   <p style={{ textAlign: "center" }}>"Incorrect package number "</p>
 )}
 {parcel && (
   <table className="ui celled table">
     <thead>
       <tr>
         <th>Sending Date</th>
         <th>Status</th>
         <th>Courier ID</th>
         <th>Delivery Date</th>
         <th>Dimensions</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>{parcel.date_send}</td>
         <td
           style={{
             color:
               parcel.status === "received"
                 ? "#006622"
                 : parcel.status === "send"
                 ? "#0099ff"
                 : "#e68a00"
           }}
         >
           {parcel.status}
         </td>
         <td>{parcel.courier_id}</td>
         <td>{parcel.date_delivery}</td>
         <td>
           depth(mm): {parcel.dimensions.depth}
           <br />
           height(mm): {parcel.dimensions.height}
           <br />
           width(mm): {parcel.dimensions.width}
           <br />
           weight(kg): {parcel.dimensions.weight}
           <br />
         </td>
       </tr>
     </tbody>
   </table>
 )}
</div>)
 }};


export default SearchBar;
