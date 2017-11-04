import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toggleStreamSocket } from '../actions'
import {SelectField, MenuItem, Drawer, AppBar, Divider} from 'material-ui'
import ChipInput from 'material-ui-chip-input'

const mapStateToProps = (state = {}) => {
	return { ...state.twitter };
};

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
			filter: 1,
			chips: []
    }
  }

  handleRequestAdd(...chips) {
    this.setState({
      chips: [...this.state.chips, ...chips]
    });
  }

  handleRequestDelete(deletedChip) {
    this.setState({
      chips: this.state.chips.filter((c) => c !== deletedChip)
    });
	}
	
	handlePaste(event) {
		const clipboardText = event.clipboardData.getData('Text');
		event.preventDefault();
		this.handleRequestAdd(...clipboardText.split('\n').filter((t) => t.length > 0));

		if(this.props.onPaste) this.props.onPaste(event);
	}

	handleFilterChange = (event, index, value) => this.setState({filter: value});

	render(){
		const { stream, dispatch } = this.props
		return(
			<Drawer docked={true} open={true} type="permanent" width={290}>
				<AppBar showMenuIconButton={false} title="Filter" />
				<MenuItem 
					style={{paddingTop:"9px", paddingBottom:"9px"}}
					onClick={() => dispatch(toggleStreamSocket(this.props.ws))}
				>
					{stream?"Stop":"Start"} stream
				</MenuItem>
				<Divider />
				<SelectField
          value={this.state.filter}
					onChange={this.handleFilterChange}
					underlineShow={false}
					style={{paddingLeft:"15px", paddingTop:"7px"}}
        >
          <MenuItem value={1} primaryText="Statuses" />
          <MenuItem value={2} primaryText="Site" />
        </SelectField>
				<Divider />
				<ChipInput
					hintText="Type in a tracker and press enter"
					value={this.state.chips}
					onPaste={(event) => this.handlePaste(event)}
					onRequestAdd={(chip) => this.handleRequestAdd(chip)}
					onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
					underlineShow={false}
					style={{paddingLeft:"15px", paddingTop:"7px"}}
				/>
				<Divider />
			</Drawer>
		)
	}
}

export default connect(mapStateToProps)(Menu)