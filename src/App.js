import React, {useState, useEffect} from 'react';
import styles from './App.module.css';

function App() {
  const [data, setData] = useState(null)
  const [text, setText] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(d => {
      d = d.map(item => item.name)
      setData(d)
    })
  }, [])

  const inputHandle = (event) => {
    let txt = event.target.value
    txt = txt ? txt[0].toUpperCase() + txt.slice(1) : txt
    let filteredData = txt ? data.filter(item => item.startsWith(txt)) : []
    setResults(filteredData)
  }

  return (
    data ?
    <div className={styles.App}>
      <label>Search - </label>
      <input
        onChange={(e) => inputHandle(e)}
      />
      {
        results.length ?
        <div className={styles.Results}>
          {
            results.map(res => {
              return (
                  <p key={res}>{res}</p>
                )
            })
          }
        </div>
        : null
      }
    </div>
    : <h3>Loading</h3>
  );
}

export default App;
