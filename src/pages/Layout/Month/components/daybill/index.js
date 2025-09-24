import classNames from "classnames";
import "./index.scss";
import { useMemo } from "react";

const DailyBill = ({ data, date }) => {
  console.log(data);
  console.log(date);
  const resultBill = useMemo(() => {
    const pay = data
      .filter((item) => item.type === "pay")
      .reduce((sum, item) => {
        return sum + item.money;
      }, 0);
    const income = data
      .filter((item) => item.type === "income")
      .reduce((sum, item) => {
        return sum + item.money;
      }, 0);
    return {
      pay: pay,
      income: income,
      total: pay + income,
    };
  }, [data]);
  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{resultBill.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{resultBill.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{resultBill.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyBill;
