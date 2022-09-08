import React from "react";
import { useForm, ValidationError } from "@formspree/react";

function FormSpreeJobsite() {
  const [state, handleSubmit] = useForm("xvolzwdj");
  if (state.succeeded) {
    return (
      <p>Thanks for your submission! We will be in touch with you shortly.</p>
    );
  }
  return (
    <div className="formspree-form">
      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/f/xvolzwdj"
        method="POST"
      >
        {/* Put the cc emails in the value field below */}
        <input
          type="hidden"
          name="_cc"
          value="paul.hagen@toromont.com,scott.graham@toromont.com,david.white@toromont.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <div className="row">
          <div className="col-lg-6">
            <label>First Name</label>
            <label id="formspree">
              <input type="text" name="first name" aria-label="first name" />
              <ValidationError
                prefix="First Name"
                field="first name"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Last Name</label>
            <label id="formspree">
              <input type="text" name="last name" aria-label="last name" />
              <ValidationError
                prefix="Last Name"
                field="last name"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>Company Name</label>
            <label id="formspree">
              <input
                type="text"
                name="company name"
                aria-label="company name"
              />
              <ValidationError
                prefix="Company Name"
                field="company name"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Email</label>
            <label id="formspree">
              <input type="email" name="email" aria-label="email" />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>Cell Phone Number</label>
            <label id="formspree">
              <input type="text" name="phone" aria-label="phone" />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Address</label>
            <label id="formspree">
              <input type="text" name="address" aria-label="address" />
              <ValidationError
                prefix="Address"
                field="address"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>City</label>
            <label id="formspree">
              <input type="text" name="city" aria-label="city" />
              <ValidationError
                prefix="City"
                field="city"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Province</label>
            <select name="province" id="province" aria-label="province">
              <option value="ontario">Ontario</option>
              <option value="manitoba">Manitoba</option>
              <option value="quebec">Quebec</option>
              <option value="new brunswick">New Brunswick</option>
              <option value="nova scotia">Nova Scotia</option>
              <option value="pei">Prince Edward Island</option>
              <option value="newfoundland and labrador">
                Newfoundland and Labrador
              </option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>Equipment, Tools or Services Interested In</label>
            <label id="formspree">
              <input
                type="text"
                name="interested in"
                aria-label="interested in"
              />
              <ValidationError
                prefix="Interested In"
                field="interested in"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={state.submitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormSpreeJobsite;
