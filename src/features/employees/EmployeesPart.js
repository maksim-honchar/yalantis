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
                  <div key={worker.id}>
                    <label htmlFor="names">{worker.lastName} {worker.firstName}</label>
                    <input type="checkbox" defaultChecked={worker.check} id="names" name="names" />
                  </div>
                )
              }
            })
          }
        </div>
      )
    } else {
      return (
        <div className="column-table" key={letter}>
          <p>{letter}</p>
          <p>---</p>
        </div>
      )
    }
  })

  useEffect(() => {
    const fetchData = () => async dispatch => {
      try {
        const request = await fetch(mainUrl)
        const response = await request.json()
        response.forEach(worker => Object.assign(worker, { check: false }))
        dispatch(actionData(response))
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

