// convert cumulative data transfer amounts into MB/s
for (let i = d.length - 1; i > 0; i--) {
  const milliseconds = d[i][0].getTime() - d[i-1][0].getTime()
  const deltaData = d[i][1] - d[i-1][1]
  d[i][1] = deltaData / milliseconds / 1000
}
d[0][1] = 0

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('datetime', 'time')
  data.addColumn('number', 'MB/s')
  data.addRows(d)
  const options = {
    title: 'Data transferred',
    width: 1000,
    height: 600,
    orientation: 'horizontal',
    legend: { position: 'none' }
  }
  const chart = new google.visualization.BarChart(
    document.getElementById('chart'))
  chart.draw(data, options);
}
