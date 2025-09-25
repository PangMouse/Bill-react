import classNames from "classnames";
import "./index.scss";
import { useMemo, useState } from "react";
import { billTypeToName } from "@/constants";
import Icon from "../icon";

const DailyBill = ({ data, date }) => {
  const [visible, setvisible] = useState(false);
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
          <span
            className={classNames("arrow", visible && "expand")}
            onClick={() => setvisible(!visible)}
          ></span>
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
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {data.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor}></Icon>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyBill;
