// import Row from './Row';
// import React, { useState } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   View,
//   TextInput,
//   LogBox,
// } from 'react-native';
 
 

// const PrimaryTextInput = ({
//   leftIcon = '',
//   rightIcon = '',
//   rightPng,
//   placeholder = '',
//   style,
//   inputValue,
//    onChangeText,
//    type,
//    secureTextEntry,
//    textAlign,
//    onLeftPress,
//    onBlur,
//    placeholderTextColor='gray',
//    onFocus,
//    existThreat,
//    onEyeClick,
//    eyeClick
   
// }) => {
  
// //   const LeftIcon = SVG[leftIcon];
// //   const RightIcon = SVG[rightIcon];
 

//   return (
//     <Row style={{ ...styles.main, ...style }}>
      
//       {/* <TouchableOpacity onPress={onLeftPress}>
//       {LeftIcon ? <LeftIcon /> : null}
//       </TouchableOpacity> */}

      
//       <TextInput
//         style={styles.input}
//        value={inputValue}
//         placeholder={placeholder}
//         placeholderTextColor={placeholderTextColor}
//         onChangeText={onChangeText} 
//         keyboardType={type}
//         secureTextEntry={secureTextEntry}
//         textAlign={textAlign}
//         onBlur={onBlur}
//         onFocus={onFocus}
        

//         />
// {/* 
// <TouchableOpacity onPress={onEyeClick}>
// {RightIcon ? <RightIcon fill='darkblue'/> : null}
// </TouchableOpacity> */}
     
//       {/* {rightPng ? (
//         <View
//           style={{
//             height: 40,
//             width: 40,
//             backgroundColor: colors.primary,
//             borderRadius: 20,
//             justifyContent: 'center',
//             alignItems: 'center',
            
//           }}>
//           <Image
//             source={rightPng}
//             style={{ height: 30, width: 30, }}
//           />
//         </View>
//       ) : null} */}
//       {/* <View style={{backgroundColor: colors.primary, height: 30, width: 30}}>
//         <Icon name={Icons.EYE_ICON_CROSS} type={'FontAwesome'} />
//       </View> */}
//     </Row>
//   );
// };
// export default PrimaryTextInput;

// const styles = StyleSheet.create({
//   main: {
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//     height: 60,
//     borderBottomWidth: 1,
//     marginHorizontal: 15,
//   },

//   input: {
//     flex: 1,
//     paddingRight: mvs(10),
//     color: 'black', 
    
//   },

// });