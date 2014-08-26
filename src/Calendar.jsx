/** @jsx React.DOM */

var Calendar = React.createClass({
	getDefaultProps: function () {
		return {
			date: new Date().toISOString(),
			sixRows: true
		};
	},
	getInitialState: function () {
		var state = {
			date: moment(this.props.date),

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
		return <CalendarMonth date={month} sixRows={this.props.sixRows}/>
	},
	render: function() {
		return (
			<div className="panel panel-default">
				<CalendarHeader date={this.state.date} />
				<div className="panel-body">
					{this._renderRows()}
				</div>
			</div>
		);
	},
	_renderRows: function() {
		var rows = [],
			currRow = [];
		for (var i = 0; i < this.state.months.length; i++) {
			currRow.push(this._renderMonth(this.state.months[i]));
			if (i % 4 === 3) {
				rows.push(currRow);
				currRow = [];
			}
		}
		return rows.map(function(row) { return <div className="row">{row}</div> })
	}
});

Calendar.create = function(target, opts) {
	return React.renderComponent(Calendar(opts), target);
};