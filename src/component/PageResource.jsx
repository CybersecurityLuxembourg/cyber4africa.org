import React from "react";
import "./PageResource.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import Loading from "./box/Loading.jsx";
import { getContentFromBlock } from "../utils/article.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageResource extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			article: null,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
		});

		getRequest.call(this, "public/get_public_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageResource page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/resources">Resources</Link></Breadcrumb.Item>
							{this.state.article !== null
								? <Breadcrumb.Item><Link to={"/resource/" + this.props.match.params.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null && this.state.article.content !== undefined
					? <div className="row row-spaced">
						<div className="col-md-12">
							<article>
								<div className='PageResource-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										: ""}
								</div>

								<h1 className="showFulltext">
									{this.state.article.title}
								</h1>

								{this.state.article.abstract !== null
									&& <div
										className="PageResource-abstract"
										dangerouslySetInnerHTML={{
											__html:
											dompurify.sanitize(this.state.article.abstract),
										}}>
									</div>
								}

								{this.state.article.content.map((b, i) => {
									if (positionToTreat <= i) {
										positionToTreat += 1;
										return getContentFromBlock(b);
									}
									return null;
								})}
							</article>
						</div>
					</div>
					: <Loading
						height={400}
					/>
				}
			</div>
		);
	}
}
