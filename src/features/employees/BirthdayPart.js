import { useSelector } from 'react-redux'
import { selectData } from './employeesSlice'
import { months } from '../../app/utils'


export const BirthdayPart = () => {
    const workers = useSelector(selectData)

    const table = months
        .map(month => {
            if (workers.find(worker => month === (months[Number(worker.dob.substring(5, 7)) - 1]) && worker.check)) {
                return (
                    <div>
                        <h5>
                            {month}
                        </h5>
                        <div>
                            {
                                workers
                                    .filter(worker => worker.check)
                                    .map(worker => {
                                        if (month === months[Number(worker.dob.substring(5, 7)) - 1]) {
                                            return (
                                                <p>{worker.lastName}</p>
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


    return (
        <section>
            <h2>Employees birthday​</h2>
            {table}
        </section>
    )
}
