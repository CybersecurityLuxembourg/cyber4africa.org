import React from "react";
import "./PageEcosystem.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import CompanySearch from "./form/CompanySearch.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageEcosystem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			companies: null,
			taxonomy: "ECOSYSTEM ROLE",
			taxonomyValues: [
				"Consortium member",
				"Service provider",
				"Institutional partner",
				"Academic partner",
				"Professional Association",
			],
			filters: {
				name: getUrlParameter("name"),
			},
		};
	}

	componentDidMount() {
		this.getPublicCompany();
	}

	getPublicCompany() {
		this.setState({
			companies: null,
		}, () => {
			getRequest.call(this, "public/get_public_entities?"
				+ dictToURI(this.state.filters), (data) => {
				this.setState({
					companies: data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	onSearch() {
		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + dictToURI(this.state.filters));

		this.getPublicCompany();
	}

	getTaxonomyValueId(value) {
		if (this.props.analytics) {
			const v = this.props.analytics.taxonomy_values
				.filter((va) => va.category === this.state.taxonomy && va.name === value);

			if (v.length > 0) {
				return v[0].id;
			}
		}

		return null;
	}

	getEntityIdsFromTaxonomyValue(value) {
		if (!this.props.analytics) {
			return [];
		}

		return this.props.analytics.taxonomy_assignments
			.filter((a) => a.taxonomy_value_id === this.getTaxonomyValueId(value))
			.map((a) => a.entity_id);
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	render() {
		return (
			<div className={"PageEcosystem page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/ecosystem">Ecosystem</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<CompanySearch
					filters={this.state.filters}
					onChange={(f, v) => this.modifyFilters(f, v)}
					onSearch={() => this.onSearch()}
				/>

				{this.state.taxonomyValues.map((v) => (
					<div className="row" key={v}>
						<div className="col-md-12">
							<h1>{v}</h1>
						</div>

						{this.state.companies
							&& this.state.companies
								.filter((c) => this.getEntityIdsFromTaxonomyValue(v).indexOf(c.id) >= 0)
								.length > 0
							&& <div className="col-md-12">
								<SimpleTable
									numberDisplayed={10}
									elements={this.state.companies
										.filter((c) => this.getEntityIdsFromTaxonomyValue(v).indexOf(c.id) >= 0)
										.map((a, i) => [a, i])}
									buildElement={(a) => (
										<div className="col-md-6">
											<Company
												info={a}
											/>
										</div>
									)}
								/>
							</div>
						}

						{this.state.companies !== null
							&& this.state.companies
								.filter((c) => this.getEntityIdsFromTaxonomyValue(v).indexOf(c.id) >= 0)
								.length === 0
							&& <div className="col-md-12">
								<Message
									text={"No entity found"}
									height={300}
								/>
							</div>
						}

						{this.state.companies === null
							&& <div className="col-md-12">
								<Loading
									height={200}
								/>
							</div>
						}
					</div>
				))}
			</div>
		);
	}
}
