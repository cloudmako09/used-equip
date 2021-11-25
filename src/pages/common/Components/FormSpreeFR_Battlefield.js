import React from "react";

export default class FormSpreeFR extends React.Component {
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
          action="https://formspree.io/mwkraenw"
          method="POST"
        >
          <input
            type="hidden"
            name="_cc"
            value="david.white@toromont.com,Elizabeth.Willis@toromont.com,Will.Bradley@Toromont.com"
          />
          <div className="row">
            <div className="col-lg-6">
              <label>Prénom</label>
              <input type="text" name="Prénom" aria-label="Prénom" />
            </div>
            <div className="col-lg-6">
              <label>Nom de famille</label>
              <input type="text" name="Nom de famille" aria-label="Nom de famille" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Nom de la compagnie</label>
              <input type="text" name="Nom de la compagnie" aria-label="Nom de la compagnie" />
            </div>
            <div className="col-lg-6">
              <label>Adresse courriel</label>
              <input type="email" name="Adresse courriel" aria-label="Adresse courriel" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Numéro de téléphone portable</label>
              <input type="text" name="Numéro de téléphone portable" aria-label="Numéro de téléphone portable" />
            </div>
            <div className="col-lg-6">
              <label>Adresse</label>
              <input type="text" name="Adresse" aria-label="Adresse"/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Ville</label>
              <input type="text" name="Ville" aria-label="Ville" />
            </div>
            <div className="col-lg-6">
              <label>Province</label>
              <select name="province" id="province" aria-label="province">
                <option value="quebec">Quebec</option>
                <option value="ontario">Ontario</option>
                <option value="manitoba">Manitoba</option>
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
              <label>Machines ou services intéressés</label>
              <input type="text" name="Machines ou services intéressés" aria-label="Machines ou services intéressés" />
            </div>
          </div>
            
          {status === "SUCCESS" ? (
            <p>Merci pour votre soumission! Nous vous contacterons sous peu.</p>
          ) : (
            <button className="btn btn-primary">Soumettre</button>
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
