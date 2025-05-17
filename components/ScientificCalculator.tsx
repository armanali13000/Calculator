// ScientificCalculator.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const handlePress = (input: string) => {
    if (input === 'C') return setDisplay('0');
    if (input === 'DEL') return setDisplay(display.length > 1 ? display.slice(0, -1) : '0');

    if (input === '=') {
      try {
        let expression = display
          .replace(/\^/g, '**')
          .replace(/\u221A/g, 'Math.sqrt')
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/\u03C0/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/÷/g, '/')
          .replace(/×/g, '*');

        while (expression.match(/(\d+)!/)) {
          expression = expression.replace(/(\d+)!/, (_, n) => {
            return factorial(parseInt(n)).toString();
          });
        }

        const result = eval(expression);
        setDisplay(result.toString());
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    if (display === '0' || display === 'Error') {
      setDisplay(input);
    } else {
      setDisplay(display + input);
    }
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
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.displayText}>{display}</Text>
        </ScrollView>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          {renderButton('C', '#ff3333')}
          {renderButton('DEL', '#a5a5a5')}
          {renderButton('(', '#a5a5a5')}
          {renderButton(')', '#a5a5a5')}
        </View>
        <View style={styles.row}>
          {renderButton('log(')}
          {renderButton('ln(')}
          {renderButton('!')}
        </View>
        <View style={styles.row}>
          {renderButton('√(')}
          {renderButton('π')}
          {renderButton('e')}
        </View>
        <View style={styles.row}>
          {renderButton('sin(')}
          {renderButton('cos(')}
          {renderButton('tan(')}
          {renderButton('^', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('÷', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('×', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('-', '#ff9f0a')}
        </View>
        <View style={styles.row}>
          {renderButton('0')}
          {renderButton('.')}
          {renderButton('=', '#34c759')}
          {renderButton('+', '#ff9f0a')}
        </View>
      </View>
    </View>
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
    marginBottom: -85,
  },
  displayText: {
    color: 'black',
    fontSize: 40,
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
    height: 50,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});
