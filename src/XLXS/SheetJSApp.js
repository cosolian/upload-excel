import React from "react";
import XLSX from "xlsx";
import DragDropFile from "./DragDropFile";
import DataInput from "./DataInput";
import OutTable from "./OutTable";

/* generate an array of column objects */
const make_cols = (refstr, columns) => {
  console.log("colums ", columns)
  const columnArray = columns.split(",");
  //const columns = ["A", "M", "Z"]
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) {
    if (columns) {
      if (columnArray.find(column => column.toUpperCase() === XLSX.utils.encode_col(i))) {
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
      }
    } else {
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    }
  };
  return o;
};

class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
      value: ""
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.exportFile = this.exportFile.bind(this);
  }
  handleFile(file) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      //const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const columns = this.state.value.split(",");

      let cols = [];
      let rows = [];
      for (var i = 0; i < columns.length; i++) {
        cols[i] = { name: ws[columns[i].toUpperCase()].v, key: i }
        rows[i] = { name: ws[columns[i].toUpperCase()].v, key: i }
      }
      this.setState({ data: rows, cols: cols });

      /* Update state */
      //this.setState({ data: data, cols: make_cols(ws["!ref"], this.state.value) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // exportFile() {
  //   /* convert state to workbook */
  //   const ws = XLSX.utils.aoa_to_sheet(this.state.data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  //   /* generate XLSX file and send to client */
  //   XLSX.writeFile(wb, "sheetjs.xlsx");
  // }
  render() {
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <table>
              <tr>
                <td>
                  <label>
                    ใส่คอลัมน์และแถวที่ต้องการเช่น a1 หรือ a1,b2&nbsp;:&nbsp;&nbsp;&nbsp;
                    <input type="text" width="550px" value={this.state.value} onChange={this.handleChange} />
                  </label>
                </td>
                <td>
                  <DataInput handleFile={this.handleFile} />
                </td>
              </tr>
            </table>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div> */}
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={this.state.data} cols={this.state.cols} />
          </div>
        </div>
      </DragDropFile>
    );
  }
}

export default SheetJSApp;
