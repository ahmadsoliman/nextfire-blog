import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import debounce from "lodash.debounce";

import AuthContext from "../../lib/auth-context";
import doesUserNameExists from "../../lib/doesUserNameExists";
import { firestore } from "../../lib/firebase";
import UserNameFormMessage from "./UserNameFormMessage";

export function UserNameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, userName } = useContext(AuthContext);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isValid && user) {
      try {
        const userDoc = firestore.doc(`users/${user.uid}`);
        const userNameDoc = firestore.doc(`usernames/${formValue}`);

        const batch = firestore.batch();
        batch.set(userDoc, {
          userName: formValue,
          photoURL: user.photoURL,
          displayName: user.displayName,
        });
        batch.set(userNameDoc, { uid: user.uid });

        await batch.commit();
      } catch (e) {
        setError(e);
      }
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setIsValid(false);
      setIsLoading(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  const checkUserName = useCallback(
    debounce(async (userName: string) => {
      if (userName.length >= 3) {
        try {
          const exists = await doesUserNameExists(userName);
          setIsValid(!exists);
          setIsLoading(false);
        } catch (e) {
          setError(e);
          setIsLoading(false);
        }
      }
    }, 300),
    []
  );

  useEffect(() => {
    checkUserName(formValue);
  }, [formValue]);

  return (
    !userName && (
      <section>
        <h3>Pick a Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="User name"
            value={formValue}
            onChange={onChange}
          />
          <UserNameFormMessage {...{ userName, isValid, isLoading, error }} />
          <button
            type="submit"
            className="text-white bg-green-400"
            disabled={!isValid}
          >
            Choose
          </button>
        </form>
      </section>
    )
  );
}
