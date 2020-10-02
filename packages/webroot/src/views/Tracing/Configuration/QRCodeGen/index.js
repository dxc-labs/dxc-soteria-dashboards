import React, { Component, lazy, useState } from "react";

import QRCodeGen from "./QRCodeGen";
import { Button } from "reactstrap";

import { qrCodeGen } from "../../services/Api";
const apiName = "tracing";
const GenerateQr = () => {
  const [loading, setLoading] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const [isDone, setIsDone] = useState(false);

  // const api = axios.create({
  //   baseURL: `${process.env.REACT_APP_API_DOMAIN}tracing`,

  // });

  const handleSubmit = props => {
    if (props.quantity <= 10) {
      setLoading(true);

      let params = {
        rows: props.rows,
        cols: props.cols,
        no_sheet: props.quantity,
        xdim: props.xdim,
        ydim: props.ydim,
        tp_bt_mar: props.tp_bt_mar,
        rt_lt_mar: props.rt_lt_mar,
        template: props.template
      };

      qrCodeGen(params)
        .then(res => {
          setLoading(false);
          const file = new Blob([res], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          setPdfLink(fileURL);

          setIsDone(true);
        })
        .catch(err => console.log(err));
    } else {
      alert("Number of sheets shoubld not be more than 10");
      setLoading(false);
    }
  };

  return (
    <>
      {!isDone ? (
        <>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="card w-75">
                <div className="card-body">
                  <h3>QR Generator</h3>
                  <p>Use this page to generate a PDF with QR Codes</p>
                  <QRCodeGen handleSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class="card w-75">
          <div class="card-body">
            <Button
              class="btn btn-ghost-primary"
              style={{ position: "relative" }}
              onClick={() => {
                setIsDone(false);
              }}
            >
              Back
            </Button>
            <center>
              <h3>PDF Generated</h3>

              <h6>
                <a href={pdfLink} target="_blank">
                  Click here to download your PDF.
                </a>
              </h6>
            </center>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateQr;
