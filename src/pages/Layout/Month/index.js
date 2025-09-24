import { useMemo, useState } from "react";
import "./index.scss";
import { NavBar, DatePicker } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import lodash from "lodash";
import DailyBill from "./components/daybill";

const Month = () => {
  const { billList } = useSelector((state) => state.bill);
  const [dateVisible, setDateVisible] = useState(false);
  const [currentMonthList, setCurrentMonthList] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const newbilllist = useMemo(() => {
    return lodash.groupBy(billList, (item) =>
      dayjs(item.date).format("YYYY-MM")
    );
  }, [billList]);
  const resultBill = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((sum, item) => {
        return sum + item.money;
      }, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((sum, item) => {
        return sum + item.money;
      }, 0);
    return {
      pay: pay,
      income: income,
      total: pay + income,
    };
  }, [currentMonthList]);

  const onConfirm = (data) => {
    console.log("onconfirm方法的", data);
    setDateVisible(false);
    setCurrentDate(dayjs(data).format("YYYY-MM"));
    const nowday = dayjs(data).format("YYYY-MM");
    setCurrentMonthList(newbilllist[nowday]);
  };
  //按日进行分组
  const newDayBill = useMemo(() => {
    const daylist = lodash.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(daylist);
    return {
      daylist,
      keys,
    };
  }, [currentMonthList]);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}月账单</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{resultBill.pay.toFixed(1)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{resultBill.income.toFixed(1)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{resultBill.total.toFixed(1)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => console.log("貌似不需要了")}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {newDayBill.keys.map((item) => {
          return (
            <DailyBill
              key={item}
              data={newDayBill.daylist[item]}
              date={item}
            ></DailyBill>
          );
        })}
      </div>
    </div>
  );
};

export default Month;
