
import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

export default function Alert() {
  const { alert } = useContext(alertContext);

  if (!alert) return null;

    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

  return (
   <div
  className={`alert alert-${alert.type} alert-dismissible fade show text-center`}
  role="alert"
  style={{
    position: "fixed",
          
    left: 0,         
    width: "100%",   
    zIndex: 1050,   
    borderRadius: 0,  
      marginBottom: "10px",
       paddingBottom: "10px",
  }}
>
       <strong>
  {alert.type === 'danger' ? 'Error' : 'Success'}
</strong>: {alert.msg}

    </div>
  );
}
