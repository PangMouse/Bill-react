import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBillList } from "@/store/module/billStore";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";
import { TabBar } from "antd-mobile";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const setRouteActive = (path) => {
    navigate(path);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);
  const tabs = [
    {
      key: "/month",
      title: "月度账单",
      icon: <BillOutline />,
    },
    {
      key: "/new",
      title: "记账",
      icon: <AddCircleOutline />,
    },
    {
      key: "/year",
      title: "年度账单",
      icon: <CalculatorOutline />,
    },
  ];
  return (
    <div>
      <div className="layout">
        <div className="container">
          <Outlet />
        </div>
        <div className="footer">
          <TabBar
            onChange={(e) => {
              setRouteActive(e);
            }}
          >
            {tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      </div>
    </div>
  );
};

export default Layout;
