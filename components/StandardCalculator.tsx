import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function StandardCalculator() {
  const [display, setDisplay] = useState('0');
  const [lastInput, setLastInput] = useState('');

  const handlePress = (input: string) => {
    if (input === 'C') {
      setDisplay('0');
      setLastInput('');
      return;
    }

    if (input === '%') {
      const value = parseFloat(display);
      if (!isNaN(value)) {
        setDisplay((value / 100).toString());
      }
      return;
    }

    if (input === '=') {
      try {
        const result = eval(display.replace('×', '*').replace('÷', '/'));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }
      return;
    }

    if (input === 'DEL') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
      return;
    }

    if (display === '0' || display === 'Error') {
      setDisplay(input);
    } else {
      setDisplay(display + input);
    }

    setLastInput(input);
  };

  const renderButton = (label: string, color: string = '#333') => (
    <TouchableOpacity
      onPress={() => handlePress(label)}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          {renderButton('C', '#ff3333')}
          {renderButton('DEL', '#a5a5a5')}
          {renderButton('%', '#a5a5a5')}
          {renderButton('÷', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('×', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('-', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('+', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('=', '#34c759')}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: 'black',
    fontSize: 60,
  },
  buttonsContainer: {
    flex: 5,
    padding: 10,
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
  },
});
