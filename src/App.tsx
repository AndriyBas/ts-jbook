import * as React from "react";
// import CodeCell from "./components/CodeCell";
// import TextEditor from "./components/TextEditor";
import CellList from "./components/CellList";

const App = () => {
  React.useEffect(() => {
    const handler = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        // ignore it
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };
    window.addEventListener("error", handler);
    return () => {
      window.removeEventListener("error", handler);
    };
  }, []);
  return (
    <div>
      <CellList />
      {/* <TextEditor /> */}
      {/* <br /> */}
      {/* <CodeCell /> */}
    </div>
  );
};

export default App;
