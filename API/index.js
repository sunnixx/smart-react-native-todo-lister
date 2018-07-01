import {AsyncStorage} from 'react-native';

app = {};

app.store = async function (data) {
  await fetch('http://10.0.3.2:5000/store', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .catch(err => { throw err })
}

app.load = async function() {
  await fetch('http://10.0.3.2:5000/load')
  .then((response) => {
    response.json().then(result => AsyncStorage.setItem('items',JSON.stringify(result)));
  })
  .catch(err => {throw err;}) 
}

module.exports = app;