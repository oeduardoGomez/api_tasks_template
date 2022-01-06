//run server

import app from './app'
import './database'


app.listen(app.get('port'));

console.log('running on port :', app.get('port'))





