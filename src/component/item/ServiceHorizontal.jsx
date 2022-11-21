import React, { Component } from "react";
import "./ServiceHorizontal.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class ServiceHorizontal extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getImage() {
		const baseUrl = getApiURL() + "public/get_public_image/";

		if (this.props.info.image) {
			return baseUrl + this.props.info.image;
		}

		if (!this.props.info.is_created_by_admin
			&& this.props.info.entity_tags
			&& this.props.info.entity_tags.length > 0
			&& this.props.companies) {
			const companies = this.props.companies
				.filter((c) => this.props.info.entity_tags.indexOf(c.id) >= 0)
				.filter((c) => c.image);

			if (companies.length > 0) {
				return baseUrl + companies[0].image;
			}
		}

		return null;
	}

	getBoxContent() {
		return (
			<div className="ServiceHorizontal card">
				<div className="card-horizontal">
					<div className="img-square-wrapper">
						{this.getImage()
							? <img
								className="card-img-top"
								src={this.getImage()}
								alt="Service image"/>
							: <NoImage/>
						}
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						<button
							className={"blue-background"}
						>
							Know more
						</button>
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

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="ServiceHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/service/" + this.props.info.handle} className="ServiceHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
