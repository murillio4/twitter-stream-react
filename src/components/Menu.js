import React, {Component} from 'react';
import {TextField, Drawer, AppBar, Divider} from 'material-ui';
import ChipInput from 'material-ui-chip-input'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

	render(){
		return(
			<Drawer docked={true} open={true} type="permanent" width={300}>
				<AppBar showMenuIconButton={false} title="Filter" />
				<TextField 
					hintText="Search"
					underlineShow={false}
					style={{paddingLeft:"15px"}}
					/>
				<Divider />
				<ChipInput
					hintText="Insert Trackers"
					value={this.state.chips}
					onPaste={(event) => this.handlePaste(event)}
					onRequestAdd={(chip) => this.handleRequestAdd(chip)}
					onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
					underlineShow={false}
					style={{paddingLeft:"15px"}}
				/>
				<Divider />
			</Drawer>
		)
	}
}

/*<SelectField 
                    floatingLabelText="Sort By"
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{marginLeft: 15}}
                    underlineShow={false} >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField>*/

export default Menu;