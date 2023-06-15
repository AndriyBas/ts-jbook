import { useTypedSelector } from "./useTypedSelector";

const showFunc = `
      import _React from "react";
      import _ReactDOM from "react-dom";
      var show = (value) => {
        const root = document.querySelector("#root");
        if (typeof value === "object") {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root); // JSX element
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
      `;
const emptyShowFunc = "var show = () => {};";

export const useCumulativeCode = (cellId: string) => {
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells!;
    const orderedCells = order.map((id) => data[id]);
    const cummulativeCode: string[] = [emptyShowFunc];
    for (let c of orderedCells) {
      if (c.type === "code") {
        // insert normal show func just beore the current code cell;
        if (c.id === cellId) cummulativeCode.push(showFunc);
        cummulativeCode.push(c.content);
      }
      if (c.id === cellId) break;
    }
    return cummulativeCode;
  });
  return cumulativeCode.join("\n");
};
