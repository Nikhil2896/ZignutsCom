import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Theme from '../constants/Theme';
import { useDispatch } from 'react-redux';
import { onLogin } from '../redux/loginSlice';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const loginUser = () => {
    let toLower = email.toLowerCase();
    if (
      toLower.trim() == 'test@zignuts.com' ||
      (toLower.trim() == 'practical@zignuts.com' && password.trim() == '123456')
    ) {
      dispatch(onLogin({ login: true, email: email }));
      props.onSuccess();
    } else {
      setErrorMessage('Invalid Email/Password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.heading}>LogIn to Continue</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Email :</Text>
          <TextInput
            keyboardType={'email-address'}
            placeholder={'Enter your email...'}
            maxLength={50}
            value={email}
            onChangeText={setEmail}
            selectionColor={Theme.colors.primaryColor}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Password :</Text>
          <TextInput
            secureTextEntry
            placeholder={'Enter your password...'}
            maxLength={30}
            value={password}
            onChangeText={setPassword}
            selectionColor={Theme.colors.primaryColor}
            style={styles.textInput}
          />
        </View>
        {errorMessage && <Text style={styles.errorMsg}>{errorMessage}</Text>}
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={loginUser}>
            <Text style={styles.addCart} disabled={disabled}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.onClose()}>
            <Text style={styles.addCart}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
  },
  form: {
    backgroundColor: Theme.colors.white,
    elevation: Theme.elevation.default,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  title: {
    fontSize: Theme.fontSize.font15,
    color: Theme.colors.primaryColor,
  },
  textInput: {
    borderWidth: Theme.borderWidth.default,
    paddingHorizontal: 15,
    borderColor: Theme.colors.primaryColor,
    borderRadius: Theme.borderRadius.default,
    color: Theme.colors.black,
  },
  inputContainer: {
    marginVertical: 5,
  },
  submitButton: {
    alignSelf: 'center',
    borderRadius: Theme.borderRadius.default,
    marginTop: 20,
  },
  errorMsg: {
    marginTop: 20,
    textAlign: 'center',
    color: Theme.colors.error,
    fontSize: Theme.fontSize.error,
  },
  addCart: {
    backgroundColor: Theme.colors.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 4,
    elevation: 4,
    fontWeight: '500',
  },
  heading: {
    textAlign: 'center',
    paddingBottom: 30,
    fontWeight: '500',
    color: Theme.colors.primaryColor,
    fontSize: Theme.fontSize.font18,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Login;
