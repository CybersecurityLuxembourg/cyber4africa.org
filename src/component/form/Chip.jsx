import React, { Component } from "react";
import "./Chip.css";

export default class Chip extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		/*
			this.props.url has been replaced by this.props.url_fake

			The usage of the links on the Chips has not been implemented.
			Mostly used for the search page redirection, it could be
			set on demand.
		*/
		return <div className="Chip">
			<div
				className="Chip-head"
				style={{ backgroundColor: this.props.color !== undefined ? this.props.color : null }}>
				<i className="fas fa-hashtag"/>
			</div>

			{this.props.url_fake
				? <object
					className={"Chip-link-wrapper"}
					onClick={() => {
						if (this.props.url_fake) {
							window.open(this.props.url_fake, "_self");
						}
					}}>
					<div className="Chip-content">
						{this.props.label}
					</div>
				</object>
				: <div className="Chip-content">
					{this.props.label}
				</div>
			}

			{this.props.onClick !== undefined
				? <div className="Chip-close">
					<i
						className="fas fa-times"
						onClick={() => this.props.onClick(this.props.value)}
					/>
				</div>
				: ""}
		</div>;
	}
}
