import myProvider from '../provider/netcore';
import {Config}  from '../config'
import httpClient  from './httpClient'

export default  myProvider(Config.apiUrl + '/api', httpClient);


