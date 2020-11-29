import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionData, selectData } from './employeesSlice'
import { mainUrl, alphaBet } from '../../app/utils'

import { loadState } from '../../app/sessionStorage'

export const EmployeesPart = () => {
  const dispatch = useDispatch()
  const workers = useSelector(selectData)

  const toggleCheckbox = id => {
    const updateWorkers = workers.map(worker => {
      if (worker.id === id) {
        return { ...worker, check: !worker.check }
      } else {
        return worker
      }
    })
    dispatch(actionData(updateWorkers))
  }

  const table = alphaBet.map(letter => {
    if (workers.find(worker => worker.lastName.substring(0, 1) === letter)) {
      return (
        <div className="card" key={letter}>
          <div className="title-card">
            <p>
              <strong>{letter}</strong>
            </p>
          </div>

          {
            workers.map(worker => {
              if (worker.lastName.substring(0, 1) === letter) {
                return (
                  <div key={worker.id} className="card-content">
                    <label
                      htmlFor={`${worker.lastName} ${worker.firstName}`}
                    >
                      {worker.lastName} {worker.firstName}
                    </label>
                    <input
                      type="checkbox"
                      defaultChecked={worker.check}
                      id={worker.id}
                      name={`${worker.lastName} ${worker.firstName}`}
                      onChange={() => toggleCheckbox(worker.id)}
                    />
                  </div>
                )
              }
              return null
            })
          }
        </div>
      )
    } else {
      return (
        <div className="card" key={letter}>
          <div className="title-card">
            <p>
              <strong>{letter}</strong>
            </p>
          </div>
          <div className="card-content">
            <strong>- - -</strong>
          </div>
        </div>
      )
    }
  })

  useEffect(() => {
    const persistedState = loadState()
    if (persistedState) {
      dispatch(actionData(persistedState.employees.data))
    } else {
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
    }
  }, [dispatch])


  return (
    <section>
      <div className="heading">
        <h2>Employees</h2>
      </div>
      <div className="wrapper-empPage">
        {table}
      </div>
    </section>
  )
}

