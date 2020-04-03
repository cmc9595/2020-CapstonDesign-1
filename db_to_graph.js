//http://18.233.171.252:8082/graph

var express = require('express')
var app = express()
fs = require('fs')
mysql = require('mysql')

require('date-utils')

var connection = mysql.createConnection({
host: 'localhost',
user: 'me',
password: 'mypassword',
database: 'mydb'
})
connection.connect()

app.get('/graph', function (req, res) {
		console.log('got app.get(graph)')
		
		var html = fs.readFile('./graph.html', function (err, html) {

				html = " " + html
				console.log('read file')

				var qstr = 'select * from sensors ';
				connection.query(qstr, function(err, rows, cols) {
						if(err) throw err

						var data = ""
						var comma = ""

						for (var i=0; i<rows.length; i++){
							r = rows[i];

							var year = r.time.toFormat('YYYY')
							var month = r.time.toFormat('MM')-1
							var day = r.time.toFormat('DD')
							var hour = r.time.toFormat('HH')
							var min = r.time.toFormat('MI')
							var sec = r.time.toFormat('SS')
							
							console.log(r.time)
							console.log(year + month + day + hour + min)
							//data += comma + "[new Date(" + r.time + ")," + r.value + "]"

							data += comma + "[new Date(" + year + "," + month + "," + day + "," + hour + "," + min + "," + sec + ")," + r.value + "]"
							//data += comma + "[new Date(2017,04-1," + r.id + ",00,38)," + r.value + "]"
							
							comma = ","
						}

						var header = "data.addColumn('date', 'Date/Time');"
						header += "data.addColumn('number', 'Value');"
						html = html.replace("<%HEADER%>", header);
						html = html.replace("<%DATA%>", data);

						res.writeHeader(200, {"Content-Type": "text/html"});
						res.write(html);
						res.end();
				});
		});
});

var server = app.listen(8082, function() {
		var host = server.address().address
		var port = server.address().port
		console.log('listening at http://%s:%s', host, port)
});

