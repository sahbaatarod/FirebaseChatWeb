import React from "react";

// Router
import { NavLink } from "react-router-dom";

// Components
import Layout from "../../components/Layout/Layout";

function ErrorComp() {
  return (
    <Layout title="Error">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          height: "100%",
          marginTop: "3em",
        }}
      >
        <div>
          Page Not Found
          <NavLink to="/">Homepage</NavLink>
        </div>
      </div>
    </Layout>
  );
}

export default ErrorComp;
