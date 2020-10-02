import React, { useState, useEffect } from "react";
import {
  CDataTable,
  CCardBody,
  CBadge,
  CButton,
  CCollapse
} from "@coreui/react";

import {
  locationTrace,
  postTrace,
  getUserByEmail,
  getUserById
} from "../../services/Api";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

export default function Tracing() {
  const [email, setEmail] = useState("");
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(false);

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userData, setUserData] = useState([]);

  const [submit, isSubmitting] = useState(false);
  const export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
    let header = arrayHeader.join(delimiter) + "\n";
    let csv = header;

    arrayData.forEach(item => {
      let row = [];

      if (typeof item == "string") {
        row.push(item);

        csv += row.join(delimiter) + "\n";
      } else if (typeof item == "object") {
        for (let key in item) {
          row.push(item[key]);
        }
        csv += row.join(delimiter) + "\n";
      }
    });

    let csvData = new Blob([csv], { type: "text/csv" });
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement("a");
    hiddenElement.href = csvUrl;
    hiddenElement.target = "_blank";
    hiddenElement.download = fileName + ".csv";
    hiddenElement.click();
  };

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const handleExportTraceEmails = async () => {
    const user = await getUserByEmail(email)
      .then(user => {
        return user;
      })
      .catch(err => {
        isSubmitting(false);
        ToastsStore.error(" Oops, The user doesn't exist !!! ");
        
      });
 
    if (user.sub) {
      const trace = await postTrace({
        userId: user.sub,
        to: toDate,
        from: fromDate,
        users: users
      });

      let emails = [];
      // FIXME: getUserById needs to be rewritten to accept a list or single.
      // This should speedup the return instead of calling each time for a user
      await asyncForEach(users, async userId => {
        userId = userId.split("#")[1];
        await getUserById(userId)
          .then(user => {
            emails.push(user.email);
            isSubmitting(false);
            
          })
          .catch(err => {
            emails.push(userId);
            isSubmitting(false);
           
          });
      });

      const dateobj = new Date();
      export_csv(["Email"], emails, ",", `trace-${dateobj.toISOString()}`);
    } else {
      isSubmitting(false);
      ToastsStore.error(" Oops, Something went wrong !!! ");
    }
  };

  const handleTrace = () => {
    let params = {};

    params["queryStringParameters"] = {
      from: `${fromDate}T00:00:00`,
      to: `${toDate}T23:59:59`
    };

    locationTrace(email, params)
      .then(res => {
        if (res.length > 0) {
          setUserData(res);
          setError(false);
        } else {
          setError(true);
          setUserData([]);
        }
      })
      .catch(err => {
        setError(true);
        setUserData([]);
      });
  };

  useEffect(() => {
    let users = [];
    let locations = [];
    userData.forEach(user => {
      if (!users.includes(user.pk)) {
        users.push(user.pk);
      }
      if (!locations.includes(user.locationCode)) {
        locations.push(user.locationCode);
      }
    });
    setLocations(locations);
    setUsers(users);
  }, [userData]);

  const fields = [
    { key: "gsi2pk", label: "LocationId", _style: { width: "20%" } },
    { key: "locationCode", label: "Location", _style: { width: "20%" } },
    { key: "sk", label: "Checkin Time", _style: { width: "20%" } },
    { key: "pk", label: "User ID", _style: { width: "20%" } }
  ];

  return (
    <>
      <ToastsContainer
        position={ToastsContainerPosition.TOP_CENTER}
        store={ToastsStore}
        lightBackground
      />
      <form>
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="card w-75">
              <div class="card-body">
                <h3>
                  <b>Location Tracing</b>
                </h3>

                {/* UserId Input Field */}
                <div class="form-group">
                  <label for="quantity">
                    <b>Employee Email or ID</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group">
                  <label for="FromDate">
                    <b>From</b>
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="FromDate"
                    value={fromDate}
                    onChange={e => {
                      setFromDate(e.target.value);
                    }}
                  />
                </div>

                {fromDate && (
                  <div class="form-group">
                    <label for="ToDate">
                      <b>To</b>
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      value={toDate}
                      id="ToDate"
                      onChange={e => {
                        setToDate(e.target.value);
                      }}
                    />
                  </div>
                )}

                {toDate && (
                  <div>
                    <button
                      type="button"
                      // class="btn btn-secondary  btn-lg"
                      data-toggle="button"
                      aria-pressed="false"
                      class="btn btn-outline-primary btn-block"
                      onClick={() => {
                        handleTrace();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Render table if userData is not null */}
      {userData.length > 0 && (
        <>
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="card w-75">
                <div class="card-body">
                  <h3>Trace Summary</h3>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th>Email</th>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <th>Date Range</th>
                        <td>
                          {fromDate} - {toDate}
                        </td>
                      </tr>
                      <tr>
                        <th>Total Affected Checkins</th>
                        <td>{userData.length}</td>
                      </tr>
                      <tr>
                        <th>Total Affected Locations</th>
                        <td>{locations.length}</td>
                      </tr>
                      <tr>
                        <th>Total Affected Users</th>
                        <td>{users.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <button
                      type="button"
                      data-style="expand-left"
                      data-toggle="button"
                      aria-pressed="false"
                      class="btn btn-outline-primary btn-block "
                      data-style="zoom-in"
                      onClick={() => {
                        isSubmitting(true);
                        handleExportTraceEmails();
                      }}
                    >
                      {submit ? "Fetching..." : "Click to download emails"}
                    </button>
                    {/* TODO: Add loading indicator this process takes some time. This needs to be addressed in API */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CDataTable
            items={userData}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={20}
            hover
            sorter
            pagination
            scopedSlots={{
              locationCode: item => {
                if (item.locationCode) {
                  return <p>{item.locationCode}</p>;
                } else {
                  return <p>Not Available</p>;
                }
              }
            }}
          />
        </>
      )}

      {/* Render error if api error */}
      {error && (
        <>
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="card w-75">
                <div class="card-body">
                  <h3>Whops :(</h3>

                  <h4>
                    Data not available for this time frame, please give a
                    different time frame.
                  </h4>
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
