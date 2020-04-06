var port = 8002

var express = require('express')
var app = express()
fs = require('fs')
mysql = require('mysql')

require('date-utils')

var connection = mysql.createConnection({
host: 'localhost',
user:'me',
password:'mypassword',
database:'weatherdb'
})
connection.connect();

app.get('/RSS', function(req, res) {
		console.log('got app.get(graph)')

		var html = fs.readFile('./graph.html', function(err, html) {

				html = " " + html
				console.log('read file')

				var qstr = 'select * from data ';
				connection.query(qstr, function(err, rows, cols){
						if(err) throw err

						var data=""
						var comma=""

						for(var i=0;i<rows.length;i++)
						{
							r=rows[i];

							var year = r.date.substring(0,4)
							var month = r.date.substring(4,6)
							var day = r.date.substring(6,8)
							var hour = r.date.substring(8,10)
							var min = r.date.substring(10,12)
							//console.log(year+month+day+hour+min)
							//console.log(new Date(2020, 04, 06, 11, 00))

							data += comma + "[new Date("+year+","+month+"-1,"+day+","+hour+","+min+"),"+r.temp+"]"
							//console.log(data)

							comma = ","
						}

						var header = "data.addColumn('date', 'Date/Time');"
						header += "data.addColumn('number', 'Temperature');"

						html = html.replace("<%HEADER%>", header);
						html = html.replace("<%DATA%>", data);

						res.writeHeader(200, {"Content-Type":"text/html"});
						res.write(html);
						res.end();
				});

		});

});

var server = app.listen(port, function(){
		var host = server.address().address
		var port = server.address().port
		console.log('listening at http://%s:%s', host, port)
		});
