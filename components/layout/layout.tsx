import Header from "components/header/header";
import React from "react";

interface LayoutProps {
  children: React.ReactElement
}

const Layout = (props:LayoutProps) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  )
}

export default Layout;