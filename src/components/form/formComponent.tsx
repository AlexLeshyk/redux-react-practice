import { Formik, Field, Form, ErrorMessage } from "formik";
import { ISendForm } from "../../types/users";
import * as Yup from "yup";

const FormComponent = () => {
  return (
    <Formik
      onSubmit={(values: ISendForm) => {
        console.log(JSON.stringify(values, null, 2));
      }}
      initialValues={{
        name: "",
        email: "",
        currency: "",
        amount: 0,
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required field")
          .min(3, "Must be 3 characters or more")
          .max(12, "Must be 12 characters or less"),
        text: Yup.string().max(40, "Must be 40 characters or less").required("Required field"),
        email: Yup.string().required("Required field").email("Invalid email address"),
        amount: Yup.number().required("Required field").min(5, "Not less then 5"),
        currency: Yup.string().required("Choose currency"),
        terms: Yup.boolean().required("Consent required").oneOf([true], "Consent required"),
      })}
    >
      <Form className="form">
        <div className="form-control">
          <h2>Send a donation</h2>
        </div>
        <div className="form-control">
          <label htmlFor="name">Name: </label>
          <Field id="name" name="name" type="text" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email: </label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount: </label>
          <Field id="amount" name="amount" type="number" />
          <ErrorMessage name="amount" component="div" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="currency">Currency </label>
          <Field id="currency" name="currency" as="select">
            <option value="">Choose your currency</option>
            <option value="USD">USD</option>
            <option value="UAH">UAH</option>
            <option value="RUB">RUB</option>
          </Field>
          <ErrorMessage name="currency" component="div" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="text">Your message: </label>
          <Field id="text" name="text" as="textarea" />
          <ErrorMessage name="text" component="div" className="error" />
        </div>
        <div className="form-control">
          <label className="checkbox">
            <Field name="terms" type="checkbox" />
            Do you agree with the privacy policy?
          </label>
          <ErrorMessage name="terms" component="div" className="error" />
        </div>
        <div className="form-control">
          <button className="button button__main button__long" type="submit">
            <div className="inner">Send</div>
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormComponent;
