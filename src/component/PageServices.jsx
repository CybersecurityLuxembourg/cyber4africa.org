import React from "react";
import "./PageServices.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import ServiceHorizontal from "./item/ServiceHorizontal.jsx";
import Message from "./box/Message.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import ServiceSearch from "./form/ServiceSearch.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageServices extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: null,
			newsCompanies: null,
			filters: {
				type: "SERVICE",
				title: "",
				include_tags: "true",
				per_page: 20,
				page: getUrlParameter("page") !== null ? parseInt(getUrlParameter("page"), 10) : 1,
			},
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles(page) {
		this.setState({
			articles: null,
			newsCompanies: null,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		});

		let params = {
			...this.state.filters,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		};

		params = dictToURI(params);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		filters.page = 1;
		this.setState({ filters });
	}

	getSortedArticles() {
		const getPos = (title) => {
			for (let i = 0; i < this.props.serviceOrder.length; i++) {
				if (title.includes(this.props.serviceOrder[i])) {
					return i;
				}
			}

			return Number.MAX_SAFE_INTEGER;
		};

		return this.state.articles.items.sort((a, b) => getPos(a.title) - getPos(b.title));
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/services">Services</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<ServiceSearch
							filters={this.state.filters}
							onChange={(f, v) => this.modifyFilters(f, v)}
							onSearch={() => this.getArticles()}
						/>
					</div>
				</div>

				{this.state.articles !== null && this.state.articles.pagination
					&& this.state.articles.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found"}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && this.state.articles.pagination
					&& this.state.articles.pagination.total > 0
					&& <DynamicTable
						items={this.getSortedArticles()}
						pagination={this.state.articles.pagination}
						changePage={(page) => this.getArticles(page)}
						buildElement={(a) => <div className="col-md-6">
							<ServiceHorizontal
								info={a}
								analytics={this.props.analytics}
								companies={this.state.newsCompanies}
							/>
						</div>
						}
					/>
				}

				{(this.state.articles === null
					|| this.state.articles.pagination === undefined
					|| this.state.articles.items === undefined)
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
