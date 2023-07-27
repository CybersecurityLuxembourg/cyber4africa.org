import React, { Component } from "react";
import "./JobOfferHorizontal.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import Chip from "../form/Chip.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class JobOfferHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getBoxContent = this.getBoxContent.bind(this);
		this.getTagsContent = this.getTagsContent.bind(this);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="JobOfferHorizontal card">
				<div className="card-horizontal">
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						{this.getTagsContent()}

						<button
							className={"blue-background"}
						>
							Know more
						</button>
					</div>

					<div className="card-date">
						{dateToString(this.props.info.publication_date, "DD MMM YYYY")}
					</div>
				</div>
				{this.props.info.abstract !== null && this.props.info.abstract.length > 0
					&& <div className="card-text">
						<div dangerouslySetInnerHTML={{
							__html:
							dompurify.sanitize(this.props.info.abstract),
						}} />
					</div>
				}
			</div>
		);
	}

	getTagsContent() {
		if (this.props.info.entity_tags
			&& this.props.info.entity_tags.length > 0
			&& this.props.companies) {
			return <div className="card-tags">
				{this.props.info.entity_tags
					.filter((c) => this.props.companies.filter((d) => d.id === c).length > 0)
					.map((v) => <Chip
						key={this.props.companies.filter((d) => d.id === v)[0].name}
						label={this.props.companies.filter((d) => d.id === v)[0].name}
						color={"#109E92"}
						url={"/company/" + v}
					/>)}
			</div>;
		}

		return null;
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="JobOfferHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/job/" + this.props.info.handle} className="JobOfferHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
