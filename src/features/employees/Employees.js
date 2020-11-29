import "./Employees.css";
import { EmployeesPart } from "./EmployeesPart";
import { BirthdayPart } from "./BirthdayPart";

export const Employees = () => {
  return (
    <section>
      <div className="wrapper">
        <EmployeesPart />
        <BirthdayPart />
      </div>
    </section>
  );
};
