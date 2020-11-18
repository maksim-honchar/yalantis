import { useEffect, useState } from 'react'

import { mainUrl } from '../../app/mainUrl'


// const workersSort = workers.sort((a, b) => a.lastName.localeCompare(b.lastName))

const alphaBet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]


export const EmployeesPage = () => {
  const [workers, setWorkers] = useState([])

  const allSorts = alphaBet.map(letter =>
    <div style={{ border: '1px solid', padding: 5 }}>
      <p>{letter}</p>
      <p>
        {
          workers
            .filter(employer => employer.lastName.substring(0, 1) === letter)
            .map(employer => <p>{employer.lastName} {employer.firstName}</p>)
        }
      </p>
    </div>
  )


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