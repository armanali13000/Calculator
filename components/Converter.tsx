//components/Converter.tsx

import React, { useState } from 'react';
import {
  BackHandler,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ConverterType =
  | 'Temperature'
  | 'Length'
  | 'Weight'
  | 'Currency'
  | 'BMI'
  | 'Discount'
  | 'Birthday'
  | 'Time'
  | 'Speed'
  | 'Area'
  | 'Volume'
  | 'Data'
  | 'Power'
  | 'GST'
  | 'Weight Price'
  | 'Travel Cost'
  | 'Finance'
  | 'Marks Percentage'
  | 'Academic'
  | null;

export default function Converter() {
  const [input, setInput] = useState('');
  const [unitFrom, setUnitFrom] = useState('');
  const [unitTo, setUnitTo] = useState('');
  const [selectedConverter, setSelectedConverter] = useState<ConverterType>(null);
  const [extraInput, setExtraInput] = useState('');
  const [currentDay, setCurrentDay] = useState(new Date().getDate().toString());
  const [currentMonth, setCurrentMonth] = useState((new Date().getMonth() + 1).toString());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
  const [thirdInput, setThirdInput] = useState('');
  const [selectedGST, setSelectedGST] = useState<number | null>(null);
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState<'Year' | 'Month'>('Year');

  

  

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (selectedConverter !== null) {
          setSelectedConverter(null);
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [selectedConverter])
  );

  const units: Record<string, string[]> = {
    Temperature: ['Celsius', 'Fahrenheit'],
    Length: ['Meter', 'Foot', 'Inch', 'Centimeter', 'Yard', 'Kilometer', 'Mile'],
    Weight: ['Kilogram', 'Gram', 'Milligram', 'Metric Ton', 'Pound', 'Ounce', 'Stone'],
    Currency: ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF', 'SGD', 'AED'],
    Time: ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'],
    Speed: ['Mtr/s','Km/h', 'Miles/h', 'Feet/s', 'Knots', 'Mach',],
    Area: [
      'Square Meter', 'Square Foot', 'Square Yard', 'Acre', 'Hectare', 'Bigha', 'Ground', 'Cent',
      'Guntha', 'Dismil', 'Katha', 'Dhur'
    ],
    Volume: ['Milliliter', 'Liter', 'Cubic Centimeter', 'Cubic Meter', 'Teaspoon', 'Tablespoon', 'Cup', 'Pint', 'Quart', 'Gallon'],
    Data: ['Byte', 'KB', 'MB', 'GB', 'TB'],
    Power: ['Watt', 'Kilowatt', 'Megawatt', 'Horsepower', 'BTU/hour', 'Calorie/second', 'Erg/second',],
    Academic: ['Percentage', 'CGPA', 'GPA'],

  };

  const icons: Record<Exclude<ConverterType, null>, string> = {
    Temperature: 'thermometer',
    Length: 'ruler',
    Weight: 'weight-kilogram',
    Currency: 'currency-usd',
    Time: 'clock-time-four',
    Speed: 'speedometer',
    Area: 'square-outline',
    Volume: 'cup-water',
    Data: 'database',
    BMI: 'human-male-height',
    Discount: 'sale',
    Birthday: 'cake-variant',
    Power: 'flash',
    'Travel Cost': 'car',
    'Weight Price': 'currency-inr',
    GST: 'briefcase',
    Finance : 'finance',
    'Marks Percentage' : 'percent',
    Academic: 'school',
    
  };

  

  const convert = () => {
    const value = parseFloat(input);
    const secondValue = parseFloat(extraInput);
    if (isNaN(value)) return '';

    if (selectedConverter && ['BMI', 'Discount', 'Marks Percentage'].includes(selectedConverter)) {
      if (isNaN(secondValue)) return '';
    }
    

    switch (selectedConverter) {


      case 'Academic': {
          const value = parseFloat(input);
          if (isNaN(value)) return '';

                  if (unitFrom === 'Percentage' && unitTo === 'CGPA') {
              return (value / 9.5).toFixed(2); // Common 10-scale logic
          } else if (unitFrom === 'CGPA' && unitTo === 'Percentage') {
              return (value * 9.5).toFixed(2);
          } else if (unitFrom === 'Percentage' && unitTo === 'GPA') {
              return (value / 25).toFixed(2); // Example: 100% = 4.0 GPA
          } else if (unitFrom === 'GPA' && unitTo === 'Percentage') {
              return (value * 25).toFixed(2);
          } else {
              return '';
          }

          
        }


        case 'Marks Percentage': {
        const obtained = parseFloat(input);
        const total = parseFloat(extraInput);
        if (isNaN(obtained) || isNaN(total) || total === 0) return '';
        const percentage = (obtained / total) * 100;
        return percentage.toFixed(2);  // Return percentage with 2 decimal places
      }

      
      case 'Temperature':
        return unitFrom === 'Celsius'
          ? ((value * 9) / 5 + 32).toFixed(2)
          : (((value - 32) * 5) / 9).toFixed(2);

      case 'Length':
        const lengthRates: Record<string, number> = {
          Meter: 1,
          Foot: 0.3048,
          Inch: 0.0254,
          Centimeter: 0.01,
          Yard: 0.9144,
          Kilometer: 1000,
          Mile: 1609.34,
        };

        if (!lengthRates[unitFrom] || !lengthRates[unitTo]) return '';
        const lengthInMeters = value * lengthRates[unitFrom];
        const convertedLength = lengthInMeters / lengthRates[unitTo];
        return convertedLength.toFixed(4);

      case 'Weight':
         const weightRates: Record<string, number> = {
          'Kilogram': 1,
          'Gram': 0.001,
          'Milligram': 0.000001,
          'Metric Ton': 1000,
          'Pound': 0.453592,
          'Ounce': 0.0283495,
          'Stone': 6.35029,
        };

        if (!weightRates[unitFrom] || !weightRates[unitTo]) return '';
        const valueInKg = value * weightRates[unitFrom];
        const convertedWeight = valueInKg / weightRates[unitTo];
        return convertedWeight.toFixed(2);

      case 'Currency':
        const exchangeRates: Record<string, number> = {
          USD: 1,
          INR: 83,
          EUR: 0.92,
          GBP: 0.79,
          JPY: 156.5,
          CNY: 7.24,
          AUD: 1.5,
          CAD: 1.36,
          CHF: 0.91,
          SGD: 1.35,
          AED: 3.67,
        };

        if (!exchangeRates[unitFrom] || !exchangeRates[unitTo]) return '';
        const amountInUSD = value / exchangeRates[unitFrom]; // Convert to base (USD)
        const convertedCurrency = amountInUSD * exchangeRates[unitTo];
        return convertedCurrency.toFixed(2);

      case 'BMI':
        return (value / ((secondValue / 100) ** 2)).toFixed(2);

      case 'Discount':
        const discount = (value * secondValue) / 100;
        return (value - discount).toFixed(2);

      case 'Birthday':
        const [day, month, year] = input.split('-').map(Number);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return '';
        const birthDate = new Date(year, month - 1, day);
        const currentDate = new Date(
          parseInt(currentYear),
          parseInt(currentMonth) - 1,
          parseInt(currentDay)
        );
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return birthDate > currentDate ? 'Invalid Date' : age.toString();

      case 'Time':
        const conversionRates: Record<string, number> = {
          Second: 1,
          Minute: 60,
          Hour: 3600,
          Day: 86400,
          Week: 604800,
          Month: 2628000, // approx (30.44 days)
          Year: 31536000,
        };

        const fromInSeconds = value * conversionRates[unitFrom];
        const results = fromInSeconds / conversionRates[unitTo];
        return results.toFixed(4);

      case 'Speed':
       const speedRates: Record<string, number> = {
        'Mtr/s': 1,
        'Km/h': 0.277778,
        'Miles/h': 0.44704,
        'Feet/s': 0.3048,
        'Knots': 0.514444,
        'Mach': 343, // Approx at sea level at 20°C
      };

        const fromInMetersPerSec = value * speedRates[unitFrom];
        const speedResult = fromInMetersPerSec / speedRates[unitTo];
        return speedResult.toFixed(4);

      case 'Area':
        const areaRates: Record<string, number> = {
          'Square Meter': 1,
          'Square Foot': 0.092903,
          'Square Yard': 0.836127,
          'Acre': 4046.86,
          'Hectare': 10000,
          'Bigha': 2529.29,
          'Ground': 203.0,
          'Cent': 40.4686,
          'Guntha': 101.17,
          'Dismil': 40.4686,
          'Katha': 3.13 * 40.4686,
          'Dhur': (3.13 * 40.4686) / 20,
        };

        if (!areaRates[unitFrom] || !areaRates[unitTo]) return '';
        const sqmValue = value * areaRates[unitFrom];
        const result = sqmValue / areaRates[unitTo];
        return result.toFixed(4);

      case 'Volume':
       const volumeRates: Record<string, number> = {
        'Milliliter': 1,
        'Liter': 1000,
        'Cubic Centimeter': 1,
        'Cubic Meter': 1_000_000,
        'Teaspoon': 4.92892,
        'Tablespoon': 14.7868,
        'Cup': 240,
        'Pint': 473.176,
        'Quart': 946.353,
        'Gallon': 3785.41,
      };

      const fromInMilliliters = value * volumeRates[unitFrom];
      const volumeResult = fromInMilliliters / volumeRates[unitTo];
      return volumeResult.toFixed(4);

      case 'Data': 
         const dataRates: Record<string, number> = {
          Byte: 1,
          KB: 1024,
          MB: 1024 * 1024,
          GB: 1024 * 1024 * 1024,
          TB: 1024 * 1024 * 1024 * 1024,
        };


        case 'Travel Cost':
        const distance = parseFloat(input);
        const fuelPrice = parseFloat(extraInput);
        const mileage = parseFloat(thirdInput);

        if (!distance || !fuelPrice || !mileage) return '—';

        const cost = (distance / mileage) * fuelPrice;
        return cost.toFixed(2);


        case 'GST':
          const gst = parseFloat(unitFrom); // e.g., "5"
          if (isNaN(gst)) return '';
          return (value + (value * gst) / 100).toFixed(2);


        case 'Power':
          const powerRates: Record<string, number> = {
            'Watt': 1,
            'Kilowatt': 1000,
            'Megawatt': 1_000_000,
            'Horsepower': 745.7,
            'BTU/hour': 0.29307107,
            'Calorie/second': 4.1868,
            'Erg/second': 1e-7,
          };

          

          const fromInWatts = value * powerRates[unitFrom];
          const powerResult = fromInWatts / powerRates[unitTo];
          return powerResult.toFixed(4);

          const fromInBytes = value * dataRates[unitFrom];
          const dataResult = fromInBytes / dataRates[unitTo];
          return dataResult.toFixed(4);

        case 'Weight Price':
          return (value * secondValue).toFixed(2);



       case 'Finance': {
          const P = parseFloat(principal);
          const R = parseFloat(rate);
          const D = parseFloat(duration);
          if (isNaN(P) || isNaN(R) || isNaN(D)) return '';

          const n = durationType === 'Year' ? D * 12 : D; // Total months
          const r = R / 12 / 100; // Monthly interest rate

          const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          const totalPayment = emi * n;
          const totalInterest = totalPayment - P;

          return (
            `EMI: ₹${emi.toFixed(2)}\n` +
            `Total Payment: ₹${totalPayment.toFixed(2)}\n` +
            `Total Interest: ₹${totalInterest.toFixed(2)}`
          );
        }



      default:
        return '';
    }
  };

  const renderConverter = () => (
  <View style={styles.innerContainer}>
    <Text style={styles.converterTitle}>
      <Icon name={icons[selectedConverter!]} size={24} color="#007AFF" /> {selectedConverter} Converter
    </Text>

    {selectedConverter === 'Birthday' ? (
      <>
        <Text style={styles.result}>Today's Date</Text>
        <View style={styles.row}>
          <Picker selectedValue={currentDay} style={styles.unitPicker} onValueChange={setCurrentDay}>
            {[...Array(31)].map((_, i) => (
              <Picker.Item label={`${i + 1}`} value={`${i + 1}`} key={i} />
            ))}
          </Picker>
          <Picker selectedValue={currentMonth} style={styles.unitPicker} onValueChange={setCurrentMonth}>
            {[...Array(12)].map((_, i) => (
              <Picker.Item label={`${i + 1}`} value={`${i + 1}`} key={i} />
            ))}
          </Picker>
          <Picker selectedValue={currentYear} style={styles.unitPicker} onValueChange={setCurrentYear}>
            {[...Array(120)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return <Picker.Item label={`${year}`} value={`${year}`} key={i} />;
            })}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your birthday (DD-MM-YYYY)"
          value={input}
          onChangeText={setInput}
        />
      </>
    ) : (
      <>
        {(selectedConverter === 'Weight Price' || selectedConverter === 'BMI' || selectedConverter === 'Discount') && (
          <TextInput
            style={styles.input}
            placeholder={
              selectedConverter === 'Weight Price' ? 'Enter price per kg' :
              selectedConverter === 'BMI' ? 'Enter height (cm)' :
              'Discount %'
            }
            keyboardType="numeric"
            value={extraInput}
            onChangeText={setExtraInput}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={
            selectedConverter === 'Weight Price' ? 'Enter weight (kg/g)' :
            selectedConverter === 'BMI' ? 'Enter weight (kg)' :
            selectedConverter === 'Discount' ? 'Enter original price' :
            'Enter value'
          }
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
        />
        
      </>
    )}






    {selectedConverter === 'Finance' && (
  <>
    <TextInput
      style={styles.input}
      placeholder="Principal Amount"
      keyboardType="numeric"
      value={principal}
      onChangeText={setPrincipal}
    />

    <TextInput
      style={styles.input}
      placeholder="Interest Rate (%) per annum"
      keyboardType="numeric"
      value={rate}
      onChangeText={setRate}
    />

    <TextInput
      style={styles.input}
      placeholder={`Duration in ${durationType}s`}
      keyboardType="numeric"
      value={duration}
      onChangeText={setDuration}
    />

    <View style={styles.row}>
      <TouchableOpacity
        style={[
          styles.durationButton,
          durationType === 'Year' && styles.selectedDurationButton,
        ]}
        onPress={() => setDurationType('Year')}
      >
        <Text style={styles.durationText}>Years</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.durationButton,
          durationType === 'Month' && styles.selectedDurationButton,
        ]}
        onPress={() => setDurationType('Month')}
      >
        <Text style={styles.durationText}>Months</Text>
      </TouchableOpacity>
    </View>
  </>
)}

    
    {selectedConverter === 'Marks Percentage' && (
      <>
     <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Obtained Marks"
      />
      <TextInput
        style={styles.input}
        value={extraInput}
        onChangeText={setExtraInput}
        placeholder="Total Marks"
      />
      </>
    )}



    {selectedConverter === 'Travel Cost' && (
  <>
    <TextInput
      style={styles.input}
      placeholder="Enter Distance (km or miles)"
      keyboardType="numeric"
      value={input}
      onChangeText={setInput}
    />
    <TextInput
      style={styles.input}
      placeholder="Enter Fuel Price (per liter/gallon)"
      keyboardType="numeric"
      value={extraInput}
      onChangeText={setExtraInput}
    />
    <TextInput
      style={styles.input}
      placeholder="Enter Mileage (km/l or mpg)"
      keyboardType="numeric"
      value={thirdInput}
      onChangeText={setThirdInput}
    />
  </>
)}




{selectedConverter === 'GST' ? (
  <View style={styles.gstButtonsContainer}>
    {[3, 5, 12, 18, 28].map((rate) => (
      <TouchableOpacity
        key={rate}
        style={[
          styles.gstButton,
          selectedGST === rate && styles.gstButtonSelected,
        ]}
        onPress={() => {
          setUnitFrom(`${rate}`);
          setSelectedGST(rate);
        }}
      >
        <Text style={styles.gstButtonText}>{rate}%</Text>
      </TouchableOpacity>
    ))}
  </View>
) : (
  <View style={styles.row}>
    {/* Pickers here */}
  </View>
)}

    {units[selectedConverter!] && (
      <View style={styles.row}>
        <Picker selectedValue={unitFrom} style={styles.unitPicker} onValueChange={setUnitFrom}>
          {units[selectedConverter!].map((unit) => (
            <Picker.Item label={unit} value={unit} key={unit} />
          ))}
        </Picker>

        <Icon name="arrow-right-thin" size={30} color="#333" />

        <Picker selectedValue={unitTo} style={styles.unitPicker} onValueChange={setUnitTo}>
          {units[selectedConverter!].map((unit) => (
            <Picker.Item label={unit} value={unit} key={unit} />
          ))}
        </Picker>
      </View>
    )}

    <Text style={styles.result}>
      <Icon name="calculator" size={20} /> Result: {convert()}
    </Text>
  </View>

  
);


    


  const renderMainMenu = () => (
    <View style={styles.menuContainer}>
      <Text style={styles.title}>Universal Converter</Text>
      {(
        [
          'Temperature',
          'Length',
          'Weight',
          'Currency',
          'BMI',
          'Discount',
          'Birthday',
          'Time',
          'Speed',
          'Area',
          'Volume',
          'Data',
          'Power',
          'GST',
          'Weight Price',
          'Travel Cost',
          'Finance',
          'Marks Percentage',
          'Academic',
        ] as ConverterType[]
      ).map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.menuButton}
          onPress={() => {
            setSelectedConverter(type);
            if (type && units[type as keyof typeof units]) {
              setUnitFrom(units[type as keyof typeof units][0]);
              setUnitTo(units[type as keyof typeof units][1]);
            } else {
              setUnitFrom('');
              setUnitTo('');
            }
            setInput('');
            setExtraInput('');
          }}
        >
          <Icon name={icons[type as keyof typeof icons]} size={22} color="#fff" />
          <Text style={styles.menuText}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedConverter ? renderConverter() : renderMainMenu()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  menuButton: {
    backgroundColor: '#d68200',
    width: 88,
    height: 88,
    margin: 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  innerContainer: {
    gap: 20,
  },
  converterTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 18,
    padding: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  unitPicker: {
    
    width: 120,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  result: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },

  gstButtonsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 10,
},

gstButton: {
  backgroundColor: '#007AFF',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
},

gstButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
gstButtonSelected: {
  backgroundColor: '#d68200',
  transform: [{ scale: 1.05 }],
},
durationButton: {
  backgroundColor: '#ddd',
  padding: 10,
  borderRadius: 8,
  width: '45%',
  alignItems: 'center',
},
selectedDurationButton: {
  backgroundColor: '#007AFF',
},
durationText: {
  color: '#000',
  fontWeight: '600',
},
});
