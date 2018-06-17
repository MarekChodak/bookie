import React from 'react';

class VaccinationsTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
          <table className="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Next dose number</th>
              <th>Next does date</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        );
    }
}

export default VaccinationsTable;
