import React from 'react';


class ConditionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'232132'
    }

  }
  
  render() {

    return (
      <div className="selectmultiple-control">
        {this.state.value}
      </div>

    )
  }
}


export default ConditionList;