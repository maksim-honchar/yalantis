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
        <div className="column-table" key={letter}>
          <p>{letter}</p>
          {
            workers.map(worker => {
              if (worker.lastName.substring(0, 1) === letter) {
                return (
                  <div key={worker.id}>
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
        <div className="column-table" key={letter}>
          <p>{letter}</p>
          <p>---</p>
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
      <h2>Employees Part</h2>
      <div className="wrapper-empPage">
        {table}
      </div>
    </section>
  )
}

