import { Labels, Apis } from '../../constants';
import * as Utils from '../../utils';

function fetchData(){
  let that = this;
  Utils.fetchService.call(this, {
      "method": "POST",
      "url": Apis.gridData,
      "body": JSON.stringify({
          "columnType": "transportEntry",
          "dataType": "getAllSearchData"
      }),
      "callBack": (data) => {
          that.setState((prevState, props) => {
            return { "columns": data.columns }
          });
          that.setState((prevState, props) => {
            return { "rows": data.data }
          });
          that.setState((prevState, props) => {
            return { "showTable": true }
          });
          that.forceUpdate();

      }
    });
}

export default {
    fetchData
}
