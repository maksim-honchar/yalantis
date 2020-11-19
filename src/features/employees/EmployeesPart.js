import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionData, selectData } from './employeesSlice'
import { mainUrl, alphaBet } from '../../app/helpers'

export const EmployeesPart = () => {
  const dispatch = useDispatch()
  const workers = useSelector(selectData)

  const table = alphaBet.map(letter => {
    if (workers.find(worker => worker.lastName.substring(0, 1) === letter)) {
      return (
        <div className="column-table" key={letter}>
          <p>{letter}</p>
          {
            workers.map(worker => {
              if (worker.lastName.substring(0, 1) === letter) {
                return (
                  <p className="names" key={worker.id}>
                    {worker.lastName} {worker.firstName}
                  </p>
                )
              }
            })
          }
        </div>
      )
    } else {
      return (
        <div className="column-empty" key={letter}>
          <p>{letter}</p>
          <p>---</p>
        </div>
      )
    }
  })

  useEffect(() => {
    const fetchData = () => dispatch => {
      try {
        fetch(mainUrl)
          .then(response => response.json())
          .then(result => dispatch(actionData(result)))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(fetchData())
  }, [dispatch])



  return (
    <section>
      <h2>Employees Page</h2>
      <div className="wrapper-empPage">
        {table}
      </div>
    </section>
  )
}

