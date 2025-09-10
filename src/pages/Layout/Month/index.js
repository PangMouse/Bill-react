import { useMemo, useState } from "react";
import "./index.scss";
import { NavBar, DatePicker } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import lodash from "lodash";

const Month = () => {
  const { billList } = useSelector((state) => state.bill);
  const newbilllist = useMemo(() => {
    return lodash.groupBy(billList, (item) =>
      dayjs(item.date).format("YYYY-MM")
    );
  }, [billList]);
  console.log(newbilllist);
  const [dateVisible, setDateVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const onConfirm = (data) => {
    console.log(data);
    setDateVisible(false);
    setCurrentDate(dayjs(data).format("YYYY-MM"));
  };
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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
      </div>
    </div>
  );
};

export default Month;
