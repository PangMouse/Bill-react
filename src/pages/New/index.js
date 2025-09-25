import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/pages/Layout/Month/components/icon";
import "./index.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { billListData } from "@/constants";
import { useState } from "react";

const New = () => {
  const navigate = useNavigate();
  const [billtype, setBillTyle] = useState("pay");
  const [money, setMoney] = useState(0);
  const moneyChange = (e) => {
    setMoney(e.target.value);
  };
  const saveData = () => {
    console.log({
      type: billtype,
      money: money,
    });
    return {
      type: billtype,
      money: money,
    };
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav">记一笔</NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billtype === "pay" ? "selected" : "")}
            onClick={() => {
              setBillTyle("pay");
            }}
          >
            支出
          </Button>
          <Button
            className={classNames(billtype === "income" ? "selected" : "")}
            shape="rounded"
            onClick={() => {
              setBillTyle("income");
            }}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text"></span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(e) => {
                  console.log(e);
                  setMoney(e);
                }}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>
      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billtype].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    // selected
                    <div className={classNames("item", "")} key={item.type}>
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="btns">
        <Button className="btn save" onClick={saveData}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
