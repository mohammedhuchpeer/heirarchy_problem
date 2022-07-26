import { useState } from "react";
import { v4 as uuid } from "uuid";

import "./App.css";
import Accordion from "./components/Accordion";

function App() {
  const [objectName, setObjectName] = useState("");

  const [parentId, setParentId] = useState("New");
  const [parentIdOptions, setParentIdOptions] = useState([]);

  const [objects, setObjects] = useState([]);

  const findObject = (array, id, data) => {
    return array.map((item) => {
      if (item.objectId === id) {
        return { ...item, children: [...item.children, data] };
      } else if (item.children.length !== 0) {
        const children = findObject(item.children, id, data);
        return { ...item, children: children };
      }
      return item;
    });
  };

  const handleSubmit = () => {
    const uniqueId = uuid();
    const smallId = uniqueId.slice(0, 8);
    const data = {
      objectName: objectName,
      objectId: smallId,
      parentId: parentId,
      children: [],
    };

    const updatedParentIdOptions = [...parentIdOptions, data.objectId];

    setParentIdOptions(updatedParentIdOptions);
    let updatedObjects;

    if (parentId === "New") {
      updatedObjects = [...objects, data];
    } else {
      updatedObjects = findObject(objects, parentId, data);
    }
    setObjects(updatedObjects);
    setObjectName("");
    setParentId("New");
  };

  const getContent = (array) => {
    return array.map((object, index) => (
      <Accordion key={object.objectId} object={object}>
        {object.children.length ? getContent(object.children) : "heyyyy"}
      </Accordion>
    ));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-xs-8">
          <h3 className="text-info">Parent-children hierarchy</h3>
          <hr />
          <div className="form-group">
            <label htmlFor="object-name" className="text-muted">
              Object Name
            </label>
            <input
              type="text"
              value={objectName}
              className="form-control"
              name="object-name"
              onChange={(e) => setObjectName(e.target.value)}
              required
            />
          </div>
          <div className="form-group py-3">
            <label htmlFor="parent-id" className="text-muted">
              Parent ID
            </label>
            <select
              value={parentId}
              name="parent-id"
              className="form-control"
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="New">New</option>
              {parentIdOptions.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <div className="form-group py-4">
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleSubmit}
              >
                Submit Object
              </button>
            </div>
          </div>
        </div>
      </div>
      {getContent(objects)}
    </div>
  );
}

export default App;
