import React, { useState } from "react";

export default function QRCodeGen({ handleSubmit }) {
  const [quantity, setQuantity] = useState("");
  const [template, setTemplate] = useState("");
  const [totalCodes, setTotalCodes] = useState(null);
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [xDimension, setXDimension] = useState(null);
  const [yDimension, setYDimension] = useState(null);
  const [verticalMargin, setVerticalMargin] = useState(null);
  const [horizontalMargin, setHorizontalMargin] = useState(null);
  const [error, setError] = useState(false);

  const handleTemplateSelect = template => {
    setTemplate(template);

    if (template == "60505_2x4_5x2") {
      setXDimension(4);
      setYDimension(2);
      setVerticalMargin(0.5);
      setHorizontalMargin(0.156);
    } else if (template == "60506_2x2_4x3") {
      setXDimension(2);
      setYDimension(2);
      setVerticalMargin(0.625);
      setHorizontalMargin(0.625);
    } else if (template == "SingleQR_6x6_1x1") {
      setXDimension(6);
      setYDimension(6);
      setVerticalMargin(2.5);
      setHorizontalMargin(1.25);
    }
  };

  const updateQuantity = qty => {
    setQuantity(qty);
    const [rows, cols] = template.split("_")[2].split("x");
    setCols(cols);
    setRows(rows);
    setTotalCodes(qty * (rows * cols));
    if (qty > 10) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <form>
        <div class="form-group">
          <label for="template">
            <b>Template</b>
          </label>
          <select
            class="form-control"
            id="templateOptions"
            onChange={e => handleTemplateSelect(e.target.value)}
          >
            <option value="">SELECT</option>
            <option value="60506_2x2_4x3" style={{ color: "black" }}>60506_2x2_4x3</option>
            <option value="60505_2x4_5x2" style={{ color: "black" }}>60505_2x4_5x2</option>
            <option value="SingleQR_6x6_1x1" style={{ color: "black" }}>Single QR</option>
          </select>
        </div>
        {template && (
          <div class="form-group">
            <label for="quantity">
              <b>Number of pages</b>
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              value={quantity}
              onChange={e => updateQuantity(e.target.value)}
              max={10}
              min={1}
            />
            {error && (
              <div class="alert alert-danger" role="alert">
                Number of sheets should not be more than 10!
              </div>
            )}
          </div>
        )}

        {totalCodes && (
          <h6>
            This will generate{" "}
            <b>
              {quantity} {quantity > 1 ? "Pages" : "Page"}
            </b>
            , using a{" "}
            <b>
              {rows}X{cols} template
            </b>
            , for a total of <b>{totalCodes} QR codes</b>
          </h6>
        )}
        {totalCodes && loading && (
          <div class="sk-wave">
            <div class="sk-rect sk-rect1"></div>
            <div class="sk-rect sk-rect2"></div>
            <div class="sk-rect sk-rect3"></div>
            <div class="sk-rect sk-rect4"></div>
            <div class="sk-rect sk-rect5"></div>
          </div>
        )}
        {totalCodes && (
          <center>
            <button
              type="button"
              class="btn btn-outline-primary btn-block"
              // style={{ width: "50em" }}
              onClick={() => {
                setLoading(true);
                handleSubmit({
                  quantity: quantity,
                  template: template,
                  rows: rows,
                  cols: cols,
                  xdim: xDimension,
                  ydim: yDimension,
                  tp_bt_mar: verticalMargin,
                  rt_lt_mar: horizontalMargin
                });
              }}
            >
              Generate
            </button>
          </center>
        )}
      </form>
    </>
  );
}
