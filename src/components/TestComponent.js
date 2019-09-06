import React from 'react'
import favorite from '../assets/favorite.png';
import unfavorite from '../assets/unfavorite.png';

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { item } from '../actions'
import WithErrors from '../hocs/WithErrors'
import { PAGE_SIZE } from '../utils';

class testComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onFavourite = this.onFavourite.bind(this);
	}

	onFavourite(id) {
		const { favourite } = this.props;
		let newId = (this.props.page - 1) * PAGE_SIZE + id;
		favourite(newId);
	}

	render() {
		return (
			<Tiles data={this.props.data} onFavourite={(id) => this.onFavourite(id)} />
		);
	}
}

class Tiles extends React.Component {
	render() {
		// Create tile for each item in data array
		// Pass data to each tile and assign a key
		return (
			<div className="tiles">
				{this.props.data.map((data, index) => {
					return <Tile data={data} key={data.id} onFavourite={() => this.props.onFavourite(index)} />
				})}
			</div>
		);
	}
}

class Tile extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				open: false,
				mouseOver: false
			};
			// Bind properties to class instance
			this._clickHandler = this._clickHandler.bind(this);
			this._mouseEnter = this._mouseEnter.bind(this);
			this._mouseLeave = this._mouseLeave.bind(this);
			this._onFavourite = this._onFavourite.bind(this);
		}
		// Event handlers to modify state values
	_mouseEnter(e) {
		e.preventDefault();
		if (this.state.mouseOver === false) {
			console.log(this.props.data.name);
			this.setState({
				mouseOver: true
			})
		}
	}
	_mouseLeave(e) {
		e.preventDefault();
		if (this.state.mouseOver === true) {
			this.setState({
				mouseOver: false
			})
		}
	}
	_clickHandler(e) {
		e.preventDefault();
		if (this.state.open === false) {
			this.setState({
				open: true
			});
		} else {
			this.setState({
				open: false
			});
		}
	}

	_onFavourite() {
		this.props.onFavourite();
	}

	render() {
		// Modify styles based on state values
		let tileStyle = {};
		let thumbTileStyle = {};
		// When tile clicked
		if (this.state.open) {
			tileStyle = {
				width: '62vw',
				height: '62vw',
				position: 'absolute',
				top: '50%',
				left: '50%',
				margin: '0',
				marginTop: '-31vw',
				marginLeft: '-31vw',
				boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
				transform: 'none',
				zIndex: 100,
			};
		} else {
			thumbTileStyle = {
				width: '18vw',
				height: '18vw'
			};
		}

		return (
			<>
				{this.state.open && 
					<img
						onMouseEnter={this._mouseEnter}
						onMouseLeave={this._mouseLeave}
						onClick={this._clickHandler}
						src={this.props.data.url}
						alt={this.props.data.name}
						style={tileStyle}
					/>
				}

				<div className="tile">
					<img
						onMouseEnter={this._mouseEnter}
						onMouseLeave={this._mouseLeave}
						onClick={this._clickHandler}
						src={this.props.data.url}
						alt={this.props.data.name}
						style={thumbTileStyle}
					/>
					<div className="favourite">
						<img
							src={this.props.data.favourite ? favorite : unfavorite}
							onClick={this._onFavourite}
							alt={"favourite"}
						/>
					</div>
				</div>
			</>
		);
	}
}

const mapDispatchToProps = {
  favourite: item.favourite
}

export default compose(
  WithErrors,
  connect(null, mapDispatchToProps),
)(testComponent)
