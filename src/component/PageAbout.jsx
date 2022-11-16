import React from "react";
import "./PageAbout.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
		};
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

				<div className="row">
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

						<ul>
							<li><a href="https://cyber4africa.org/services/isac/">Information and Best practices Sharing (ISAC)</a></li>
							<li><a href="https://cyber4africa.org/services/sra/">Strategic and Regulatory Advisory Services (SRA)</a></li>
							<li><a href="https://cyber4africa.org/services/ccb/">Capacity Building (CCB)</a></li>
							<li><a href="https://cyber4africa.org/services/rdi/">R&D and Innovation (RDI)</a></li>
							<li><a href="https://cyber4africa.org/services/csirt/">Incident response (CSIRT)</a></li>
							<li><a href="https://cyber4africa.org/services/soc/">Security Supervision (SOC)</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
