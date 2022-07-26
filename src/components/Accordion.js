import { Collapse } from "bootstrap";

const Accordion = (props) => {
  const {
    object: { objectName, objectId },
    children,
  } = props;
  return (
    <div className="row py-2">
      <div className="col-xs-8">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#objectId-${objectId}`}
                aria-expanded="true"
                aria-controls={objectId}
              >
                {objectName} - {objectId}
              </button>
            </h2>
            <div
              className="accordion-collapse collapse show accordion-body"
              id={`objectId-${objectId}`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
