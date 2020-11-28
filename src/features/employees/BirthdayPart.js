import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectData } from './employeesSlice'
import { months } from '../../app/utils'


export const BirthdayPart = () => {
    const workers = useSelector(selectData)
    const [isSelect, setIsSelect] = useState(false)

    const formatDate = date => {
        const dobWorker = new Date(date)
        const options = { day: 'numeric', month: 'long' }
        const dayMonth = dobWorker.toLocaleDateString('en-GB', options)
        const year = dobWorker.getFullYear()
        return `${dayMonth}, ${year} year`
    }

    const table = months
        .map((month, index) => {
            if (workers.find(worker => month === (months[Number(worker.dob.substring(5, 7)) - 1]) && worker.check)) {
                return (
                    <div key={index}>
                        <h5>{month}</h5>
                        <div>
                            {
                                workers
                                    .filter(worker => worker.check)
                                    .map(worker => {
                                        if (month === months[Number(worker.dob.substring(5, 7)) - 1]) {
                                            return (
                                                <p key={worker.id}>
                                                    {worker.lastName} {worker.firstName} - {formatDate(worker.dob)}
                                                </p>
                                            )
                                        }
                                        return null
                                    })
                            }
                        </div>
                    </div>
                )
            }
            return null
        })

    useEffect(() => {
        if (workers.find(worker => worker.check)) {
            setIsSelect(true)
        } else {
            setIsSelect(false)
        }
    }, [workers])


    return (
        <section>
            <h3>Employees birthday​</h3>
            <div className="wrapper-dob">
                {
                    isSelect ? table : <p><strong>No selected employees</strong></p>
                }
            </div>
        </section>
    )
}
