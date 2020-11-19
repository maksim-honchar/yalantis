import { useEffect, useState } from 'react'

import { mainUrl, alphaBet } from '../../app/helpers'



export const EmployeesPage = () => {
  const [workers, setWorkers] = useState([])

  const allSorts = alphaBet.map(letter => {
    if (workers.find(worker => worker.lastName.substring(0, 1) === letter)) {
      return <div style={{ border: '1px solid', padding: 5 }}>
        {letter}
        {
          workers.map(employer => {
            if (employer.lastName.substring(0, 1) === letter) {
              return <p>{employer.lastName}</p>
            }
          })
        }
      </div>
    } else {
      return <div style={{ border: '1px solid', padding: 5 }}>
        {letter}
        {<p>---</p>}
      </div>
    }
  })

  useEffect(() => {
    fetch(mainUrl)
      .then(response => response.json())
      .then(result => setWorkers(result))
  }, [])



  return (
    <section>
      <h2>Employees Page</h2>
      <div style={{ display: 'flex' }}>
        {allSorts}
      </div>
    </section>
  )
}

