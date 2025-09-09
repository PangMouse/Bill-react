import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBillList } from "@/store/module/billStore";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);
  return (
    <div>
      我是layout
      <Outlet />
    </div>
  );
};

export default Layout;
