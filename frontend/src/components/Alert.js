
import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

export default function Alert() {
  const { alert } = useContext(alertContext);

  if (!alert) return null;

    const _capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

  return (
   <div
  className={`alert alert-${alert.type} alert-dismissible fade show text-center`}
  role="alert"
style={{
  position: "fixed",
  top: "56px",          
  left: 0,
  width: "100%",
  zIndex: 1050,
  borderRadius: 0,
}}

>
       <strong>
  {alert.type === 'danger' ? 'Error' : 'Success'}
</strong>: {alert.msg}

    </div>
  );
}
