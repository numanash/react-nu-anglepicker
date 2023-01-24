import React from 'react'
import ReactDOM from 'react-dom/client'
import { NuAnglePicker } from 'react-nu-anglepicker'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>
      <h2>Default NuAnglePicker</h2>
      <NuAnglePicker />
    </div>
    <hr />
    <div>
      <h2>Counter with predefined value 10</h2>
      <NuAnglePicker value={90} />
    </div>
  </React.StrictMode>,
)
