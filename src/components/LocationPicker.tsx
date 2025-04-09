import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SpeechMicButton from '../components/SpeechToText';

const fetchCoordinatesWithOpenCage = async (query: string): Promise<[number, number] | null> => {
  const apiKey = '5775d21d60724d7abc66945786b0bec3';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&language=vi&pretty=1&limit=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`OpenCage API lỗi: ${res.status}`);
    }
    const data = await res.json();

    if (data?.results?.length > 0) {
      const { geometry } = data.results[0];
      return [geometry.lng, geometry.lat];
    }
  } catch (err) {
    console.warn('Lỗi OpenCage:', err);
  }

  return null;
};

type LocationPickerProps = {
  onAddressSelected: (address: string, coords: [number, number] | null) => void;
};

export const LocationPicker = ({ onAddressSelected }: LocationPickerProps) => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [wardList, setWardList] = useState<any[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then((res) => res.json())
      .then(setProvinceList)
      .catch((err) => console.warn('Lỗi tải tỉnh/thành:', err));
  }, []);

  useEffect(() => {
    if (!province) {
      setDistrict('');
      setWard('');
      setDistrictList([]);
      setWardList([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/p/${province}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistrictList(data.districts || []);
        setDistrict('');
        setWard('');
        setWardList([]);
      })
      .catch((err) => console.warn('Lỗi tải quận/huyện:', err));
  }, [province]);

  useEffect(() => {
    if (!district) {
      setWard('');
      setWardList([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/d/${district}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWardList(data.wards || []);
        setWard('');
      })
      .catch((err) => console.warn('Lỗi tải phường/xã:', err));
  }, [district]);

  useEffect(() => {
    const searchAddress = async () => {
      if (!province || !district || !ward) {
        setCoords(null);
        setErrorMsg('');
        return;
      }

      const selectedProvince = provinceList.find((p) => p.code === province)?.name;
      const selectedDistrict = districtList.find((d) => d.code === district)?.name;

      const fullAddress = currentNote
        ? `${currentNote}, ${ward}, ${selectedDistrict}, ${selectedProvince}, Việt Nam`
        : `${ward}, ${selectedDistrict}, ${selectedProvince}, Việt Nam`;

      const result = await fetchCoordinatesWithOpenCage(fullAddress);

      if (result) {
        setCoords(result);
        setErrorMsg('');
        onAddressSelected(fullAddress, result);
      } else {
        setCoords(null);
        setErrorMsg('Không tìm thấy tọa độ.');
        onAddressSelected(fullAddress, null);
      }
    };

    searchAddress();
  }, [province, district, ward, provinceList, districtList, onAddressSelected, currentNote]);

  const handleSpeechResult = (text: string) => {
    setCurrentNote(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>City</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={province}
              onValueChange={(value) => {
                setProvince(value);
                setDistrict('');
                setWard('');
                setDistrictList([]);
                setWardList([]);
                if (value === '') {
                  onAddressSelected('', null);
                }
              }}
              style={styles.picker}
            >
              <Picker.Item label="Chọn tỉnh" value="" />
              {provinceList.map((p) => (
                <Picker.Item key={p.code} label={p.name} value={p.code} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>District</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={district}
              onValueChange={(value) => {
                setDistrict(value);
                setWard('');
                setWardList([]);
                if (value === '') {
                  onAddressSelected('', null);
                }
              }}
              enabled={province !== ''}
              style={styles.picker}
            >
              <Picker.Item label="Chọn quận/huyện" value="" />
              {districtList.map((d) => (
                <Picker.Item key={d.code} label={d.name} value={d.code} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.pickerContainer, styles.noMarginRight]}>
          <Text style={styles.label}>Ward</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={ward}
              onValueChange={setWard}
              enabled={district !== ''}
              style={styles.picker}
            >
              <Picker.Item label="Chọn phường/xã" value="" />
              {wardList.map((w) => (
                <Picker.Item key={w.code} label={w.name} value={w.name} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.addressRow}>
        <Text style={styles.label}>Address</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            value={currentNote}
            onChangeText={setCurrentNote}
            placeholder="Số nhà, đường..."
            style={styles.input}
          />
          <SpeechMicButton onResult={handleSpeechResult} />
        </View>
      </View>

      {coords && (
        <Text style={styles.result}>
          📍 Tọa độ: {coords[1].toFixed(6)}, {coords[0].toFixed(6)}
        </Text>
      )}
      {errorMsg !== '' && (
        <Text style={[styles.result, styles.errorText]}>{errorMsg}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  noMarginRight: {
    marginRight: 0,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pickerContainer: {
    flex: 1,
    marginRight: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fdfdfd',
    overflow: 'hidden',
    height: 44,
    justifyContent: 'center',
  },
  picker: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: '#333',
  },
  addressRow: {
    marginBottom: 12,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fdfdfd',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333',
  },
  icon: {
    marginLeft: 8,
    fontSize: 18,
  },
  result: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#007bff',
  },
  errorText: {
    color: 'red',
  },
  speechButton: {
    marginLeft: 8,
  },
});
