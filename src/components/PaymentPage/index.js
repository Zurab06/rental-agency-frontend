import React from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import styles from "./PaymentPage.module.css";
import { useDispatch } from "react-redux";
import { confirmUserOffer } from "../../features/offerSlice";
import { Link, useParams } from "react-router-dom";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const onSubmit = () => {
    dispatch(confirmUserOffer(id));
  };
  return (
    <div className={styles.main}>
      <Styles>
        <Form
          action="/user/main"
          onSubmit={onSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Card
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active}
                />
                <div>
                  <Field
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="Card Number"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <Field
                    name="expiry"
                    component="input"
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="Valid Thru"
                    format={formatExpirationDate}
                  />
                  <Field
                    name="cvc"
                    component="input"
                    type="text"
                    pattern="\d{3,4}"
                    placeholder="CVC"
                    format={formatCVC}
                  />
                </div>
                <div className="buttons">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <Link to="/user/main" style={{ textDecoration: "none" }}>
                      Submit
                    </Link>
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
              </form>
            );
          }}
        />
      </Styles>
    </div>
  );
};

export default PaymentPage;
