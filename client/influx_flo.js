const Influx = require ("influx")
const os = require('os');


async function demo () {
    const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'demo'
    });

    var dbnames = await influx.getDatabaseNames();
    console.log(dbnames);

    var query = `
        select * from cpu`;

//        where host = ${Influx.escape.stringLit(os.hostname())}
//        order by time desc
//        limit 10
//    `;

    var result = await influx.query(query);
    console.log(result);
    result.map (r => {
        console.log(r);
    });

}
demo();
