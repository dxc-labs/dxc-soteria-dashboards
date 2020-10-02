import React, { useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";
import { useCookies } from "react-cookie";
import { Button } from "reactstrap";
import LocationInputData from "./assets/csvTemplate/LocationInputData.csv";

import { bulkLocation } from "../../services/Api";
let ext = "";
let fileSize = 0;
export default function Form({ handleSubmit }) {
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [FileUpload, setFileUpload] = useState("");
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);
  const [Res, setRes] = useState(true);
  const [cookies] = useCookies();
  const [addedData, setAddedData] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [errorData, setErrorData] = useState();

  const JsonFormat = data => {
    for (var key in data) {
      if (data[key] == null) {
        delete data[key];
      }
    }
    return data;
  };
  // const api = axios.create({
  //   baseURL: `${process.env.REACT_APP_API_DOMAIN}tracing`
  // });
  const FileLoad = (data, fileInfo) => {
    ext = fileInfo.type;
    fileSize = fileInfo.size;
    setErrorStatus(false);
    // setExt(fileInfo.type);
    // for (var i = 0; i <= data.length; i++) {
    //   console.log(data[i]["locationCode"]);
    // }
    if (
      ext != "application/vnd.ms-excel" ||
      fileSize > 2000000 ||
      fileSize == 0
    ) {
      setErrorStatus(true);
      setError("Only csv files with size upto 2MB are allowed!");
    } else {
      let i = "";

      if (data.length != 0) {
        //alert(data.length)

        for (i = 0; i < data.length; i++) {
          if (data[i].hasOwnProperty("location_code")) {
            if (data[i].location_code != null) {
              data[i].location_code = data[i].location_code.replace(/\n/g, " ");
              // data[i].location_code = data[i].location_code.replace(/\//g, "#");
            } else {
              data.splice(i, 1);
            }

            data[i].locationCode = `${data[i].location_code}`;
            data[i] = JsonFormat(data[i]);
            data[i].timeStamp = new Date().getTime();
            data[i].owner = cookies.dashboardsid;

            delete data[i].location_code;
          } else {
            setErrorStatus(true);
            setError("Please refer the sample CSV template file, for correct format");
            break;
          }
        }

        setFileUpload(data);
        //console.log('file information is ', fileInfo)
      } else {
        setErrorStatus(true);
        setError("The file uploaded is empty, please select another file");
      }
    }
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: "greedy",
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };
  const onUpload = () => {
    if (
      ext == "application/vnd.ms-excel" &&
      fileSize > 0 &&
      fileSize <= 2000000
    ) {
      setLoading(true);

      bulkLocation(FileUpload)
        .then(res => {
          setLoading(false);
          setIsDone(true);

          if (res.added.length > 0) {
            setAddedData(res.added.length);
          } else {
            setAddedData(0);
          }
          if (res.updated.length > 0) {
            setUpdatedData(res.updated.length);
          } else {
            setUpdatedData(0);
          }
          if (res.erroneous.length > 0) {
            setErrorData(res.erroneous.length);
          } else {
            setErrorData(0);
          }
          setRes(true);
        })
        .catch(err => {
          setRes(false);
        });
    } else {
      setLoading(false);

      alert("It's not allowed");
    }
  };

  return (
    <>
      {!isDone ? (
        <form>
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="card w-75">
                <div class="card-body">
                  <h3>
                    <b>Bulk Location Upload</b>
                  </h3>
                  <h5>
                    <a href={LocationInputData} color="inherit">
                      Click here for sample CSV template.
                    </a>
                  </h5>

                  <CSVReader
                    multiple
                    type="file"
                    color="primary"
                    id="file"
                    accept=".csv"
                    label
                    onFileLoaded={FileLoad}
                    parserOptions={papaparseOptions}
                  />
                  <br />
                  {errorStatus && (
                    <div class="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    // class="btn btn-secondary  btn-lg"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    class="btn btn-outline-primary btn-block"
                    onClick={() => {
                      onUpload();
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : Res ? (
        <>
          <div class="container">
            <div class="row justify-content-md-center">
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
                    <h2>Upload of locations successful &#128515;</h2>
                    <h5>Added locations: {addedData}</h5>
                    <h5>Updated locations: {updatedData}</h5>
                    <h5>Rejected locations: {errorData}</h5>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="card w-75">
                <div class="card-body">
                  <h3>Whops :(</h3>

                  <h3>Something has gone wrong... Please try again</h3>
                  <i class="cis-thumb-down"></i>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
