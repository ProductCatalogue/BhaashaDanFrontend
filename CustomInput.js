// CustomInput.js
import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'
import LabelContainer from './component/LabelContainer'
import Colors from './constant/color'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },placeholder,
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <LabelContainer 
            label={placeholder}
            {...inputProps}
            borderColor={hasError? 'red':Colors.LoginBorderColor }
            >
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </LabelContainer>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: '30px',
    width: '100%',
    //margin: 10,
   // backgroundColor: 'white',
   // borderColor: 'gray',
   // borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  }
})

export default CustomInput