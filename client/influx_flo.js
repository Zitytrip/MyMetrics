var R = require("ramda")
const Influx = require("influx")
const os = require('os');

function percentile(arr, p) {
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];

    var index = arr.length * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
}


async function connect () {
    const influx = new Influx.InfluxDB({
        host: 'metrics.hoertlehner.com',
        database: 'demo'
    });

    var dbnames = await influx.getDatabaseNames();
    console.log(dbnames);
    return influx;
}

async function printNames(influx) {
    influx.getSeries({
        measurement: 'review',
        database: 'demo'
    }).then(names => {
        console.log('My series names in my_measurement are: ' + names.join(', '))
    })
}



async function demo() {
    var influx = await connect();
    await printNames (influx)

    var query = `select * from review order by time desc limit 10 `;
    //        where host = ${Influx.escape.stringLit(os.hostname())}
    var query = `select last(*) from review where time > now() - 21d  group by time(7d)  `;

    var result = await influx.query(query, { precision: "h" });
    console.log(result);
    result.map(r => {
        console.log(r);
    });

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

    R.map ( i => {
        var data = [];
        function addValues (v, key, obj) {
            if ( (key != "time") && (v != null) ) {
                data.push(v);
            }
        }
        R.mapObjIndexed(addValues, i);
        if (data.length>0) {
            
            var diff = function(a, b) { return a - b; };
            data = R.sort(diff, data);
            console.log(i.time, " vals: ", data)

            var p90 = percentile(data, 0.90);
            var p75 = percentile(data, 0.75);
            var p50 = percentile(data, 0.5);
            var p25 = percentile(data, 0.25);
            var p10 = percentile(data, 0.10);
            console.log(p90)
            console.log(p75)
            console.log(p50)
            console.log(p25)
            console.log(p10)
        }

    } , result);


    

}
demo();
