import React from "react";

export default class FormSpree extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
    };
  }

  render() {
    const { status } = this.state;
    return (
      <div className="formspree-form">
        <form
          onSubmit={this.submitForm}
          action="https://formspree.io/f/xzbydkvj"
          method="POST"
        >
          <input
            type="hidden"
            name="_cc"
            value="Bruce.Rondeau@Toromont.com,Will.Bradley@Toromont.com,david.white@toromont.com"
          />
          <div className="row">
            <div className="col-lg-6">
              <label>First Name</label>
              <label id="formspree">
                <input type="text" name="first name" aria-label="first name" />
              </label>
            </div>
            <div className="col-lg-6">
              <label>Last Name</label>
              <label id="formspree">
                <input type="text" name="last name" aria-label="last name" />
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
              </label>
            </div>
            <div className="col-lg-6">
              <label>Email</label>
              <label id="formspree">
                <input type="email" name="email" aria-label="email" />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Cell Phone Number</label>
              <label id="formspree">
                <input type="text" name="phone" aria-label="phone" />
              </label>
            </div>
            <div className="col-lg-6">
              <label>Address</label>
              <label id="formspree">
                <input type="text" name="address" aria-label="address" />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>City</label>
              <label id="formspree">
                <input type="text" name="city" aria-label="city" />
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
              <label>Machine or Services Interested In</label>
              <label id="formspree">
                <input
                  type="text"
                  name="interested in"
                  aria-label="interested in"
                />
              </label>
            </div>
          </div>

          {status === "SUCCESS" ? (
            <p>
              Thanks for your submission! We will be in touch with you shortly.
            </p>
          ) : (
            <button className="btn btn-primary">Submit</button>
          )}
          {status === "ERROR" && <p>Ooops! There was an error.</p>}
        </form>
      </div>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}
