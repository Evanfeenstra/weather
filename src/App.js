import React, {useContext, useState} from 'react'
import './App.css'
import {Input, Button} from 'antd'

const context = React.createContext()

function App() {
  const [state, setState] = useState({
    searchTerm:'',
  })
  return <context.Provider value={{
    ...state,
    set: v=> setState({...state, ...v})
  }}>
    <div className="App">
      <Header />
      {state.error && <div>{state.error}</div>}
    </div>
  </context.Provider>
}

function Header(){
  const ctx = useContext(context)
  return <header className="App-header">
    <Input 
      value={ctx.searchTerm}
      onChange={e=> ctx.set({searchTerm: e.target.value})}
      style={{height:'3rem',fontSize:'2rem'}} 
      onKeyPress={e=>{
        if(e.key==='Enter' && ctx.searchTerm) search(ctx)
      }}
    />
    <Button style={{marginLeft:5,height:'3rem'}}
      onClick={()=> search(ctx)} type="primary"
      disabled={!ctx.searchTerm}>
      Search
    </Button>
  </header>
}

async function search({searchTerm, set}){
  try {
    const term = searchTerm
    set({searchTerm:'', error:''})

    const osmurl = `https://nominatim.openstreetmap.org/search/${term}?format=json`
    const r = await fetch(osmurl)
    const loc = await r.json()
    if(!loc[0]){
      return set({error:'No city matching that query'})
    }
    const city = loc[0]

    const key = '45236e8510745ee86684a5946eda8cda'
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${city.lat},${city.lon}`
    const r2 = await fetch(url)
    const weather = await r2.json()
    set({weather})
  } catch(e) {
    set({error: e.message})
  }
}

export default App;
