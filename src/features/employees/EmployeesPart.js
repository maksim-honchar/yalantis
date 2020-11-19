import { useEffect, useState } from 'react'


import { mainUrl, alphaBet } from '../../app/helpers'


export const EmployeesPart = () => {
  const [workers, setWorkers] = useState([])

  const table = alphaBet.map(letter => {
    if (workers.find(worker => worker.lastName.substring(0, 1) === letter)) {
      return (
        <div className="column-table">
          <p>{letter}</p>
          {
            workers.map(worker => {
              if (worker.lastName.substring(0, 1) === letter) {
                return <p className="names">{worker.lastName} {worker.firstName}</p>
              }
            })
          }
        </div>
      )
    } else {
      return (
        <div className="column-empty">
          <p>{letter}</p>
          <p>---</p>
        </div>
      )
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
      <div className="wrapper-empPage">
        {table}
      </div>
    </section>
  )
}

