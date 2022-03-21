import { useState } from "react";
import { Formik, Field, Form, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/error";
import MarvelService from "../../services/marvelService";
import { RandomCharState } from "../../types/marvel";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [char, setChar] = useState<RandomCharState[] | null>(null);
  const { getCharacterByName, clearError, process, setProcess } = MarvelService();

  const onCharLoaded = (char: RandomCharState[]) => {
    setChar(char);
  };

  const updateChar = (name: string) => {
    clearError();
    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="char__search-form">
      <Formik
        onSubmit={(values, { resetForm }) => {
          updateChar(values.name);
          resetForm();
        }}
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required field").min(3, "Must be 3 characters or more"),
        })}
      >
        <Form className="form">
          <label htmlFor="name">Name: </label>
          <div className="char__search-wrapper">
            <Field id="name" name="name" type="text" />
            <button type="submit" className="button button__main" disabled={process === "loading"}>
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage name="name" component="div" className="char__search-error" />
        </Form>
      </Formik>
      {!char ? null : char.length > 0 ? (
        <div className="char__search-wrapper">
          <div className="char__search-success">There is! Visit {char[0].name} page?</div>
          <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
          </Link>
        </div>
      ) : (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      )}
      {process === "error" && (
        <div className="char__search-critical-error">
          <ErrorMessage />
        </div>
      )}
    </div>
  );
};

export default CharSearchForm;
