/** @jsx React.DOM */

var CalendarHeader = React.createClass({
	render: function() {
		return (
			<div className="panel-heading">
				{this.props.title}
			</div>
		);
	}
});