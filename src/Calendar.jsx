/** @jsx React.DOM */

var Calendar = React.createClass({
	getInitialState: function() {
		var state = {
			date: moment(this.props.date)
		};
		state.months = this._getMonthsForYear(state.date);
		return state;
	},
	_getMonthsForYear: function (date) {
		var months = [];
		for (var i = 0; i < 12; i++) months.push(moment([date.year(), i]));
		return months;
	},
	_renderMonth: function(month) {
		return <CalendarMonth date={month}/>
	},
	render: function() {
		return (
			<div className="panel panel-default">
				<CalendarHeader title={this.state.title} />
				<div className="panel-body">
					<div className="row">
						{this.state.months.map(this._renderMonth)}
					</div>
				</div>
			</div>
		);
	}
});

Calendar.create = function(target, opts) {
	return React.renderComponent(Calendar(opts), target);
};