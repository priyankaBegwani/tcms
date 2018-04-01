import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import Handler from './handler';
import ReactDataGrid from 'react-data-grid';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "columns":[],
        "rows":{},
        "showTable":false
    };
    this.showTable = false;
    this.rowGetter = this.rowGetter.bind(this);
    Handler.fetchData = Handler.fetchData.bind(this);
    //Handler.processForm = Handler.processForm.bind(this);
    //Handler.changeUser = Handler.changeUser.bind(this);
  }
  componentDidMount() {
       Handler.fetchData();
  }

  rowGetter(i) {
    let row = Object.assign ({},this.state.rows[i]);
    console.log("row",row)
    if(row && row.party ){
      let party = row.party && JSON.parse(row.party);
      row.party = party.label;
      let transporter = JSON.parse(row.transporter);
      row.transporter = transporter.label;
    }
    if(row.billDate || row.bilty_date){
      row.bill_date = row.bill_date.split("T").slice(0,1)[0];
      row.bilty_date = row.bilty_date.split("T").slice(0,1)[0];
    }
    return row;
  };

  render() {
     if(this.state.showTable){
       return (
        <div className="">
          <div className="menu-bar">menu</div>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={7}
          minHeight={500} />
        </div>
      )
    }else{
      return (

        <div>
            <div className="menu-bar">menu</div>
        </div>
      )
    }

}
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({},Actions), dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
