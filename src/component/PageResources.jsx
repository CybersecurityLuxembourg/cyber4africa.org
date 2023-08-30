import React from "react";
import "./PageResources.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import ResourceHorizontal from "./item/ResourceHorizontal.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import ServiceSearch from "./form/ServiceSearch.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageResources extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			resources: null,
			taxonomy: "RESOURCE CATEGORY",
			filters: {
				title: getUrlParameter("title"),
				type: "RESOURCE",
				include_tags: true,
			},
		};
	}

	componentDidMount() {
		this.getTools();
	}

	getTools(page) {
		const params = {
			...this.state.filters,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				resources: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	onSearch() {
		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + dictToURI(this.state.filters));

		this.getTools();
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	render() {
		return (
			<div className={"PageResources page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/resources">Resources</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<ServiceSearch
					filters={this.state.filters}
					onChange={(f, v) => this.modifyFilters(f, v)}
					onSearch={() => this.onSearch()}
				/>

				{this.props.analytics
					? this.props.analytics.taxonomy_values
						.filter((v) => v.category === this.state.taxonomy)
						.map((v) => (
							<div className="row" key={v}>
								<div className="col-md-12">
									<h1>{v.name}</h1>
								</div>

								{this.state.resources
									&& this.state.resources.items
										.filter((c) => c.taxonomy_tags.indexOf(v.id) >= 0)
										.length > 0
									&& <div className="col-md-12">
										<SimpleTable
											numberDisplayed={10}
											elements={this.state.resources.items
												.filter((c) => c.taxonomy_tags.indexOf(v.id) >= 0)
												.map((a, i) => [a, i])}
											buildElement={(a) => (
												<div className="col-md-6">
													<ResourceHorizontal
														info={a}
													/>
												</div>
											)}
										/>
									</div>
								}

								{this.state.resources
									&& this.state.resources.items
										.filter((c) => c.taxonomy_tags.indexOf(v.id) >= 0)
										.length === 0
									&& <div className="col-md-12">
										<Message
											text={"No resource found"}
											height={200}
										/>
									</div>
								}

								{!this.state.resources
									&& <div className="col-md-12">
										<Loading
											height={200}
										/>
									</div>
								}
							</div>
						))
					: <Loading
						height={400}
					/>
				}
			</div>
		);
	}
}
