import React, { useState, useEffect } from "react";

import {
  CDataTable,
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CForm,
  CInput,
  CLabel,
  CFormGroup,
  CTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";
// Icon Imports
import { CIcon } from "@coreui/icons-react";
import { linearSet } from "@coreui/icons-pro/js/linear";
import { solidSet } from "@coreui/icons-pro/js/solid";
import { brandSet } from "@coreui/icons-pro/js/brand";
import { duotoneSet } from "@coreui/icons-pro/js/duotone";
import { API } from "aws-amplify";
import { getLocations, patchLocation } from "../../services/Api";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
React.icons = { ...solidSet, ...linearSet, ...brandSet, ...duotoneSet };

// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_API_DOMAIN}tracing`
// });

export default function Locations() {
  const apiName = "tracing";
  const [locationRoots, setLocationRoots] = useState([]);
  const [locations, setLocations] = useState(null);
  const [locationDetailsIdx, setLocationDetailsIdx] = useState(-1);
  const [locationDetails, setLocationDetails] = useState({});
  const [NewField, updateNewField] = useState();
  const [UpdateAlet, setUpdateAlert] = useState(false);
  const [formData, setFormData] = useState({});

  var keyList = [
    "pk",
    "allocated",
    "sk",
    "gsi1pk",
    "gsi1sk",
    "owner",
    "timeStamp",
    "lastScanned",
    "lastSanitized",
    "totalScans",
    "activeCount",
    "active",
    "allocatedId",
    "status",
  ];
  let payload = {};

  useEffect(() => {
    getLocations({ root: true })
      .then((locations) => {
        setLocationRoots(locations);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePrimaryFilterUpdate = (root) => {
    getLocations({ q: root })
      .then((locations) => {
        setLocations(locations);
        setLocationDetailsIdx(-1);
      })
      .catch((err) => console.log(err));
  };
  
  const handleSubmit = (e)=>{
	  e.preventDefault();
	  let result = {};
          const formData = new FormData(e.target);
          for (var [key, value] of formData.entries()) {
			if(key!="New Attributes"){
            result[key]=value;
			}
          }
      //console.log(result);
      setFormData(result);
  };
  
  const handleToggleDetails = (idx, item) => {
	setLocationDetails({})
    //console.log("location idx:", locationDetailsIdx);  
    if (locationDetailsIdx == idx) {
      setLocationDetailsIdx(-1);

      setLocationDetails({});

      // console.log("idx:", idx);
    } else {
      setLocationDetailsIdx(idx);
      setLocationDetails(item);
      setFormData(item)
      // console.log("idx:", idx);
    }
    // console.log("item:", item);
  };

  const apiCall = (path, payload, index) => {
    patchLocation(path, payload)
      .then((res) => {

        setLocationDetailsIdx(-1);
        //setLocationDetails({});
        if (res.status == 201) {
          ToastsStore.success(" ✔ Location Details updated successfully!!! ");

          locations[index] = res.data;
          setLocations(locations);
          setFormData(res.data);
        } else if (res.status == 200) {
          if (NewField) {
            let temp = JSON.parse(NewField);
            Object.keys(temp).forEach((key) => {
              locations[index][key] = temp[key];
              // console.log(locations[index][key]);
            });
          }
          Object.keys(formData).forEach((key) => {
            locations[index][key] = formData[key]
          });
          locations[index]["gsi1sk"] = formData["locationCode"];
          setLocations(locations);
          setFormData(locations);
          //console.log("locations for true is :", locations);
          ToastsStore.success(" ✔ Location Details updated successfully !!! ");
        } else {
          ToastsStore.error(" Oops, Something Went Wrong !!! ");
        }
      })
      .catch((err) => {
        console.log(err);

         if (err.response.status == 403) {
           ToastsStore.error(
             " Oops, The entered location is already mapped !!! "
           );
         } else {
           ToastsStore.error(" Oops, Something Went Wrong !!! ");
         }
      });
  };
  const handleUpdate = (newValue) => {
    // Object.keys(locationD).forEach((key) => {
    //   if (!keyList.includes(key)) {
    //     payload[key] = locationDetails[key];
    //   }
    // });
    payload=formData

    if (newValue) {
      let temp = JSON.parse(newValue);
      Object.keys(temp).forEach((key) => {
        payload[key] = temp[key];
      });
    } else if (!newValue) {
      payload = payload;
    }

    // console.log(locationDetails);
    let index = 0;
    for (var i = 0; i < locations.length; i++) {
      if (locationDetails["gsi1sk"] == locations[i]["gsi1sk"]) {
        index = i;
        // console.log(index);
        break;
      }
    }
//	console.log("payload for false is", payload);
    if (locationDetails.pk == "LOCATIONCODE") {


      apiCall(`${encodeURIComponent(locationDetails["sk"])}`, payload, index);
    } else {
      if (locationDetails["gsi1sk"] == payload["locationCode"]) {
        delete payload.locationCode;
      }
      
      apiCall(
        `${encodeURIComponent(locationDetails["pk"].split("#").slice(-1)[0])}`,
        payload,
        index
      );
    }
  };
  const locationFields = [
    { key: "pk", label: "Primary Key" },
    { key: "locationCode", label: "Location Code" },
    { key: "allocated", label: "Allocated" },

    {
      key: "showDetails",
      label: "Actions",
      sorter: false,
      filter: false,
    },
  ];

  return (
    <>
      <ToastsContainer
        position={ToastsContainerPosition.TOP_CENTER}
        store={ToastsStore}
        lightBackground
      />
      <CModal show={UpdateAlet} onClose={!UpdateAlet} centered>
        <CModalHeader closeButton>
          <CModalTitle>Are you sure you want to update?</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton
            color="info"
            onClick={() => {
              handleUpdate(NewField);
              setUpdateAlert(false);
            }}
          >
            Update
          </CButton>
          <CButton
            color="secondary"
            onClick={() => {
              setUpdateAlert(false);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <form>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="card w-100">
              <div className="card-body">
                <h3>
                  <b>Locations view/edit</b>
                </h3>

                {/* UserId Input Field */}
                <div className="form-group">
                  <label for="locationCode">
                    <b>Primary Filter</b>
                  </label>
                  <select
                    className="form-control"
                    id="primaryFilter"
                    onChange={(e) => handlePrimaryFilterUpdate(e.target.value)}
                  >
                    <option value="" style={{ color: "black" }}></option>
                    {locationRoots.map((location) => {
                      return (
                        <option
                          key={location.locationCode}
                          value={location.locationCode}
                          style={{ color: "black" }}
                        >
                          {location.locationCode}
                        </option>
                      );
                    })}
                  </select>

                  {locations && (
                    <CDataTable
                      items={locations}
                      fields={locationFields}
                      columnFilter
                      onColumnFilterChange={(e) => {
                        setLocationDetailsIdx(-1);
                        setLocationDetails({});
                      }}
                      tableFilter
                      footer
                      itemsPerPageSelect
                      itemsPerPage={20}
                      hover
                      sorter
                      pagination
                      scopedSlots={{
                        showDetails: (item, idx) => {
                          if (locationDetailsIdx == idx) {
                            return (
                              <>
                                <td>
                                  <CIcon
                                    name="cid-eye-slash"
                                    onClick={(e) => {
                                      handleToggleDetails(idx, item);
                                    }}
                                  />
                                </td>
                                {/* <td>
                                  <CIcon name="cis-trash" disabled="disabled" />
                                </td> */}
                              </>
                            );
                          } else {
                            return (
                              <>
                                <td>
                                  <CIcon
                                    name="cid-eye"
                                    onClick={(e) => {
                                      handleToggleDetails(idx, item);
                                    }}
                                  />
                                </td>
                                {/* <td>
                                  <CIcon name="cis-trash" disabled="disabled" />
                                </td> */}
                              </>
                            );
                          }
                        },
                        details: (item, idx) => {
                          return (
                            <CCollapse show={locationDetailsIdx == idx}>
                              <CCardBody>
                                <CForm onSubmit={handleSubmit}>
                                  <CFormGroup>
                                    {Object.keys(item).map((key) => {
                                      if (!keyList.includes(key)) {
                                        // console.log(
                                        //   locationDetails["locationCode"]
                                        // );
                                        return (
                                          <>
                                            <CLabel>{key}</CLabel>
                                            <CInput
                                              type="text"
                                              name={key}
                                              value={
                                                formData[key]
                                              }
                                              onChange={(e) => {
                                                setFormData(
												                          {[e.target.name]:e.target.value}
                                                );
                                              }}
                                            />
                                          </>
                                        );
                                      }
                                    })}
                                  </CFormGroup>

                                  <>
                                    <CFormGroup>
                                      <CLabel>New Attributes</CLabel>
                                      <CTextarea
                                        type="text"
                                        name="New Attributes"
                                        rows="4"
                                        defaultValue={JSON.stringify(
                                          { key1: "value1", key2: "value2" },
                                          null,
                                          4
                                        )}
                                        onChange={(e) => {
                                          updateNewField(e.target.value);
                                        }}
                                      />
                                    </CFormGroup>

                                    <CButton
                                      type="submit"
                                      color="info"
                                      onClick={() => {
                                        setUpdateAlert(true);
                                      }}
                                    >
                                      Update
                                    </CButton>
                                  </>
                                </CForm>
                              </CCardBody>
                            </CCollapse>
                          );
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
