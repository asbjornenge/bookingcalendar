/** @jsx React.DOM */

var CalendarMonth = React.createClass({
	render: function() {
		return (
			<div className="col-md-3">
				<table className="table table-bordered">
					<thead>
						<tr><th colSpan="7">{this.props.date.format("MMMM")}</th></tr>
						<tr>{this.dayNames.map(function(name) { return <th>{name}</th> })}</tr>
					</thead>
					{this._renderBody()}
				</table>
			</div>
		);
	},

	dayNames: (function() {
		var dayNames = [];
		for (var i = 0; i < 7; i++) {
			dayNames.push(moment().weekday(i).format("dd"));
		}
		console.log(dayNames);
		return dayNames;
	})(),

	_renderBody: function() {
		var firstDayOfMonth = this.props.date.startOf("month"),
			numDaysToSkip = firstDayOfMonth.weekday(),
			buildRows = [],
			colInitializer = numDaysToSkip,
			dayIndex = 0;

		console.log(numDaysToSkip);

		for (var row = 0; row < 6; row++) {
			buildRows[row] = [-1,-1,-1,-1,-1,-1,-1];
			for (var col = colInitializer; col < 7; col++) {
				buildRows[row][col] = ++dayIndex;
			}
			colInitializer = 0;
		}

		return <tbody>{buildRows.map(this._renderRow)}</tbody>;
	},

	_renderRow: function(row) {
		return <tr>{row.map(this._renderDate)}</tr>;
	},

	_renderDate: function(date) {
		if (date === -1) return <td></td>
		return <td>{date}</td>;
	}
});