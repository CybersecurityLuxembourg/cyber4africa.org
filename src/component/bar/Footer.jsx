import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getCommunityAppURL } from "../../utils/env.jsx";
import { getSettingValue } from "../../utils/setting.jsx";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-4">
							<div className="Footer-title">MENU</div>

							<div className="row">
								<div className="col-md-6">
									<div>
										<Link to="/">Home</Link>
									</div>
									<br/>
									<div>
										<Link to="/ecosystem">Ecosystem</Link>
									</div>
									<div>
										<Link to="/news">News</Link>
									</div>
									<div>
										<Link to="/jobs">Jobs</Link>
									</div>
									<div>
										<Link to="/services">Services</Link>
									</div>
									<div>
										<Link to="/resources">Resources</Link>
									</div>
									<br/>
									<div>
										<Link to="/about">About</Link>
									</div>
									<div>
										<a href={getCommunityAppURL()}>
											{getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
												? getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
												: "Community"
											}
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6 Footer-contact">
							<div className="Footer-title">CONTACT</div>
							<br/>
							<div>VDN - Mermoz Extension</div>
							<div>Immeuble GraphiPlus</div>
							<div>Dakar, Sénégal</div>
							<br/>
							<div>Email: contact@cyber4africa.org</div>
							<br/>
							<div>© 2022 ACRC suàrl All Rights Reserved</div>
						</div>

						<div className="col-md-2">
							<div className="Footer-network">
								<a
									href="https://twitter.com/ACRC_Project"
									rel="noreferrer"
									target="_blank"
									title="Twitter"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company/africa-cybersecurity-resources-centre/"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
								<a
									href="https://www.facebook.com/people/Africa-Cybersecurity-Resource-Center/100069043970989/"
									rel="noreferrer"
									target="_blank"
									title="Facebook"
									className="text-capitalize">
									<i className="fab fa-facebook Footer-network"/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
