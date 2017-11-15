import React, { Component } from 'react';
import { connect } from 'react-redux';
import languages from 'langs';
import { toggleStreamSocket, updateFilterAsync } from '../actions';
import { SelectField, MenuItem, Drawer, AppBar, Divider } from 'material-ui';
import ChipInput from 'material-ui-chip-input';
import { red500 } from 'material-ui/styles/colors';

const mapStateToProps = (state = {}) => {
  return {
    ...state.filter,
    ws: state.tweet.ws
  };
};

/**
 * Renders application menu and its actions
 */
class Menu extends Component {
  state = {
    errorColor: {}
  };

  toggleStream = () => {
    let { dispatch, trackers, stream } = this.props;

    if (trackers.length === 0 && !stream) {
      this.setState({
        errorColor: {
          color: red500
        }
      });
    } else {
      dispatch(toggleStreamSocket());
      this.setState({ errorColor: {} });
    }
  };

  handleRequestAdd = (...new_trackers) => {
    let { dispatch, trackers, language } = this.props;
    let updated_trackers = [...trackers, ...new_trackers];

    dispatch(updateFilterAsync(updated_trackers, language));
  };

  handleRequestDelete = deletedChip => {
    let { dispatch, trackers, language } = this.props;
    let updated_trackers = trackers.filter(c => c !== deletedChip);

    dispatch(updateFilterAsync(updated_trackers, language));
  };

  handleLanguageChange = (event, index, value) => {
    let { dispatch, trackers } = this.props;

    dispatch(updateFilterAsync(trackers, value));
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    let { trackers, language, stream } = this.props;

    if (
      trackers !== nextProps.trackers ||
      language !== nextProps.language ||
      stream !== nextProps.stream
    )
      return true;

    if (this.state.errorColor !== nextState.errorColor) return true;

    return false;
  };

  render() {
    const { stream, trackers, language } = this.props;
    return (
      <Drawer docked={true} open={true} type="permanent" width={290}>
        <AppBar showMenuIconButton={false} title="Filter" />
        <MenuItem
          style={{
            paddingTop: '9px',
            paddingBottom: '9px'
          }}
          onClick={this.toggleStream}
        >
          {stream ? 'Stop' : 'Start'}
          stream
        </MenuItem>
        <Divider />
        <SelectField
          value={language}
          onChange={this.handleLanguageChange}
          underlineShow={false}
          style={{
            paddingLeft: '15px',
            paddingTop: '7px'
          }}
        >
          <MenuItem value={''} primaryText="All Languages" />{' '}
          {languages
            .all()
            .map((lang, key) => (
              <MenuItem
                key={key}
                value={lang['1']}
                primaryText={lang['name']}
              />
            ))}
        </SelectField>
        <Divider />
        <ChipInput
          hintText="Type in a tracker and press enter"
          value={trackers}
          onRequestAdd={chip => this.handleRequestAdd(chip)}
          onRequestDelete={deletedChip => this.handleRequestDelete(deletedChip)}
          underlineShow={false}
          hintStyle={this.state.errorColor}
          style={{
            paddingLeft: '15px',
            paddingTop: '7px'
          }}
        />
        <Divider />
      </Drawer>
    );
  }
}

export default connect(mapStateToProps)(Menu);
