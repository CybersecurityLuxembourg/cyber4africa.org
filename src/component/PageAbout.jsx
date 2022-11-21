import React from "react";
import "./PageAbout.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import { getSettingValue } from "../utils/setting.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: null,
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles() {
		this.setState({
			articles: null,
		});

		let params = {
			type: "SERVICE",
			per_page: 50,
			page: 1,
		};

		params = dictToURI(params);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data.items,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageAbout page max-sized-page"} id={"PageAbout"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/about">About us</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<img src={"/img/team-huddle-kids-sports.jpg"} alt="team huddle kids sports"/>
						<p>
							The ACRC is dedicated to <b>build one of the
							largest taskforce of African experts to deliver
							world-class cybersecurity services and information
							sharing </b>throughout Africa to protect the
							Financial Sector and its customers, and contribute
							to Financial Stability and Financial Inclusion.
						</p>

						<p>
							Three sub-regional offices will be progressively
							established in Senegal for French speaking
							countries, and East and West Africa for English
							speaking countries.
						</p>

						<p>
						ACRC is lead by a <b>not-for-profit consortium of
							public and private partners</b> established in
							Luxembourg and Africa, gathering over <b>365 high
							level experts</b> from
						</p>

						<ul>
							<li>SECURITYMADEIN.LU, the Cybersecurity Agency for
								the Luxembourg Economy and Municipalities,</li>
							<li>SnT, the Cybersecurity Research Centre of the
								University of Luxembourg,</li>
							<li>Excellium Services SA, cybersecurity leader in
								Luxembourg and part of one of the largest
								European players Maxive,</li>
							<li>Suricate Solutions, a leading cybersecurity
								specialist in West Africa based in Senegal with
								several years of experience in cybersecurity
								for financial inclusion, in particular in
								Security Operations.</li>
						</ul>

						<p>Our main focus area are</p>

						<ul>
							<li><b>Financial Service Providers</b>, including
							Banks, Micro-Finance Institutions, Micro-Insurances, Insurances, Postal Services</li>
							<li><b>Digital Financial Service Providers</b>,
							including Fintech and Telecom Operators</li>
							<li><b>Policy Makers</b>, Central Banks, Regulators
							and Supervisors.</li>
						</ul>

						<p>A comprehensive range of innovative services will be
							delivered to address all aspects of the strengthening
							of the cybersecurity ecosystem:
						</p>

						{this.state.articles
							? <ul>
								{this.state.articles.map((a) => (
									<li key={a.id}>
										<a href={"/service/" + a.handle}>
											{a.title}
										</a>
									</li>
								))}
							</ul>
							: <Loading
								height={200}
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}
