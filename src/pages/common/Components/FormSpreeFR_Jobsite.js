import React from "react";
import { useForm, ValidationError } from "@formspree/react";

function FormSpreeJobsiteFR() {
  const [state, handleSubmit] = useForm("mzbodjoj");
  if (state.succeeded) {
    return <p>Merci pour votre soumission! Nous vous contacterons sous peu.</p>;
  }
  return (
    <div className="formspree-form">
      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/f/mzbodjoj"
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
            <label>Prénom</label>
            <label id="formspree">
              <input type="text" name="Prénom" aria-label="Prénom" />
              <ValidationError
                prefix="Prénom"
                field="Prénom"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Nom de famille</label>
            <label id="formspree">
              <input
                type="text"
                name="Nom de famille"
                aria-label="Nom de famille"
              />
              <ValidationError
                prefix="Nom de famille"
                field="Nom de famille"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>Nom de la compagnie</label>
            <label id="formspree">
              <input
                type="text"
                name="Nom de la compagnie"
                aria-label="Nom de la compagnie"
              />
              <ValidationError
                prefix="Nom de la compagnie"
                field="Nom de la compagnie"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Adresse courriel</label>
            <label id="formspree">
              <input
                type="email"
                name="Adresse courriel"
                aria-label="Adresse courriel"
              />
              <ValidationError
                prefix="Adresse courriel"
                field="Adresse courriel"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>Numéro de téléphone portable</label>
            <label id="formspree">
              <input
                type="text"
                name="Numéro de téléphone portable"
                aria-label="Numéro de téléphone portable"
              />
              <ValidationError
                prefix="Numéro de téléphone portable"
                field="Numéro de téléphone portable"
                errors={state.errors}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>Adresse</label>
            <label id="formspree">
              <input type="email" name="Adresse" aria-label="Adresse" />
              <ValidationError
                prefix="Adresse"
                field="Adresse"
                errors={state.errors}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>Ville</label>
            <label id="formspree">
              <input type="text" name="Ville" aria-label="Ville" />
              <ValidationError
                prefix="Ville"
                field="ville"
                errors={state.errors}
              />
            </label>
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
            <label>Équipement, outils ou services intéressés par</label>
            <label id="formspree">
              <input
                type="text"
                name="Machines ou services intéressés"
                aria-label="Machines ou services intéressés"
              />
              <ValidationError
                prefix="Machines ou services intéressés"
                field="Machines ou services intéressés"
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
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default FormSpreeJobsiteFR;
