import { listTables, finishTable } from "../utils/api";
//CLOSE TABLE BUTTONS AND FUNCTION User Story 5
export default function Finish({ tableId, setTables }) {
  const clickHandler = (event) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      finishTable(tableId, abortController.signal)
        .then(() => listTables().then(setTables))
        .catch(listTables().then(setTables));
    }
  };
  return (
    <button
      className="btn btn-primary"
      onClick={clickHandler}
      data-table-id-finish={tableId}
    >
      Finish
    </button>
  );
}