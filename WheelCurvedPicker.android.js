'use strict';

import React from 'react';
import {
	View,
	ColorPropType,
	requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

class WheelCurvedPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = this._stateFromProps(props);
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState(this._stateFromProps(nextProps));
	}

	_stateFromProps = (props) => {
		let selectedIndex = 0;
		const items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});

		const textSize = props.itemStyle.fontSize
		const textColor = props.itemStyle.color

		return {selectedIndex, items, textSize, textColor};
	}

	_onValueChange = (e) => {
		if (this.props.onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	}

	render() {
		return <WheelCurvedPickerNative
				{...this.props}
				onValueChange={this._onValueChange}
				data={this.state.items}
				textColor={this.state.textColor}
				textSize={this.state.textSize}
				selectedIndex={parseInt(this.state.selectedIndex)} />;
	}
}

WheelCurvedPicker.propTypes = {
	...View.propTypes,
	data: PropTypes.array,
	textColor: ColorPropType,
	textSize: PropTypes.number,
	itemStyle: PropTypes.object,
	itemSpace: PropTypes.number,
	onValueChange: PropTypes.func,
	selectedValue: PropTypes.any,
	selectedIndex: PropTypes.number,
	dividerColor: ColorPropType,
},

WheelCurvedPicker.defaultProps = {
	itemStyle: {
		color: 'white',
		fontSize: 26,
	},
	itemSpace: 20,
	dividerColor: 'black',
};

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

WheelCurvedPicker.Item = class extends React.Component {
	render() {
		// These items don't get rendered directly.
		return null;
	}
}

WheelCurvedPicker.Item.propTypes = {
	value: PropTypes.any, // string or integer basically
	label: PropTypes.string,
}

export default WheelCurvedPicker;
