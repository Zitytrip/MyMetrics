const Influx = require ("influx")
const os = require('os')

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'telegraf',
  schema: [
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER
      },
      tags: [
        'host'
      ]
    }
  ]
})


influx.getDatabaseNames()
  .then(names => {
    console.log(names)
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db');
    }
  })
  .then(() => {
    console.log('starting..')
    add(455, 'bongo')
    add(123, 'billa')
    query ()
  })
  .catch(err => {
    console.error(`Erro ${err} !`);
  })


function add ( duration, path) { 
  console.log(` adding ${path} ..  `)

  influx.writePoints([
      {
        measurement: 'response_times',
        tags: { host: os.hostname() },
        fields: { duration: duration, path: path },
      }
    ]).catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
    })
}


function query () {
  influx.query(`
    select * from response_times
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `).then(result => {
    console.log(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
}
