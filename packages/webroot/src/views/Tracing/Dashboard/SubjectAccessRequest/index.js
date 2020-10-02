import React, { useState } from "react";
import { rightOfAccess } from "../../services/Api";

export default function SubjectAccessRequest() {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    rightOfAccess(email)
      .then(res => {
        setSuccess(true);
        setError(false);
      })
      .catch(err => {
        setSuccess(false);
        setError(err);
      });
  };

  return (
    <>
      <form>
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="card w-75">
              <div class="card-body">
                <h3>
                  <b>Subject Access Request</b>
                </h3>
                <p>
                  Under Article 15 of the GDPR, users are allowed to request
                  information about any of their personal data that your company
                  is processing. This is known as a Subject Access Request.
                </p>
                <p>
                  Use the form below to enter a users email. Once you click
                  submit the system will collect all the users information and
                  automatically email the users information to the user.
                </p>

                <div class="form-group">
                  <label for="quantity">
                    <b>Email Address of User</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="button"
                  data-toggle="button"
                  aria-pressed="false"
                  className="btn btn-outline-primary btn-block"
                  onClick={e => {
                    handleSubmit(e);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

            {success && (
              <div class="card w-75">
                <div class="card-body">
                  <h3>Success</h3>
                  <p>
                    An email has successfully been sent to the user with the
                    their personal data that has been collected
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div class="card w-75">
                <div class="card-body">
                  <h3>Unsuccessful</h3>
                  <p>
                    The supplied email address could not be found within the
                    system. Please confirm if user exists
                  </p>
                  <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
