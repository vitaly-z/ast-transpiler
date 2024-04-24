package main

import (
	"reflect"
)

func add(a interface{}, b interface{}) interface{} {
	switch aType := a.(type) {
	case int:
		if bType, ok := b.(int); ok {
			return aType + bType // Add as integers
		}
	case float64:
		if bType, ok := b.(float64); ok {
			return aType + bType // Add as floats
		}
	case string:
		if bType, ok := b.(string); ok {
			return aType + bType // Concatenate as strings
		}
	}

	return nil
}

func isTrue(a interface{}, b interface{}) bool {
	return evalTruthy(a) && evalTruthy(b)
}

// evalTruthy determines if a single interface value is truthy.
func evalTruthy(val interface{}) bool {
	if val == nil {
		return false
	}

	// Check types of val

	switch v := val.(type) {
	case int, int32, int64, uint, uint32, uint64:
		return v != 0
	case float32, float64:
		return v != 0.0
	case string:
		return v != ""
	case bool:
		return v // bool is already truthy or falsy
	default:
		// Use reflection for other complex types (slices, maps, pointers, etc.)
		valType := reflect.TypeOf(val)
		switch valType.Kind() {
		case reflect.Slice, reflect.Map, reflect.Ptr, reflect.Chan, reflect.Func:
			return !reflect.ValueOf(val).IsNil()
		}
	}

	return true // Consider non-nil complex types as truthy
}

func IsInteger(value interface{}) bool {
	switch value.(type) {
	case int, int8, int16, int32, int64:
		return true
	case uint, uint8, uint16, uint32, uint64:
		return true
	default:
		return false
	}
}

func GetValue(collection interface{}, key interface{}) interface{} {
	reflectValue := reflect.ValueOf(collection)

	switch reflectValue.Kind() {
	case reflect.Slice, reflect.Array:
		// Handle slice or array: key should be an integer index.
		index, ok := key.(int)
		if !ok {
			return nil // Key is not an int, invalid index
		}
		if index < 0 || index >= reflectValue.Len() {
			return nil // Index out of bounds
		}
		return reflectValue.Index(index).Interface()

	case reflect.Map:
		// Handle map: key needs to be appropriate for the map
		reflectKeyValue := reflect.ValueOf(key)
		if reflectValue.MapIndex(reflectKeyValue).IsValid() {
			return reflectValue.MapIndex(reflectKeyValue).Interface()
		}
		return nil

	default:
		// Type not supported
		return nil
	}
}

func Multiply(a, b interface{}) interface{} {
	aVal := reflect.ValueOf(a)
	bVal := reflect.ValueOf(b)

	// Ensure both values are numeric
	if !aVal.IsValid() || !bVal.IsValid() || !aVal.Type().ConvertibleTo(bVal.Type()) {
		return nil
	}

	// Convert a to the type of b to simplify multiplication
	aValConverted := aVal.Convert(bVal.Type())

	// Perform multiplication based on the kind of b
	switch bVal.Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return aValConverted.Int() * bVal.Int()
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return aValConverted.Uint() * bVal.Uint()
	case reflect.Float32, reflect.Float64:
		return aValConverted.Float() * bVal.Float()
	default:
		return nil
	}
}

func Divide(a, b interface{}) interface{} {
	aVal := reflect.ValueOf(a)
	bVal := reflect.ValueOf(b)

	if !aVal.IsValid() || !bVal.IsValid() || !aVal.Type().ConvertibleTo(bVal.Type()) {
		return nil
	}

	aValConverted := aVal.Convert(bVal.Type())

	switch bVal.Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		if bVal.Int() == 0 {
			return nil // Avoid division by zero
		}
		return aValConverted.Int() / bVal.Int()
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		if bVal.Uint() == 0 {
			return nil // Avoid division by zero
		}
		return aValConverted.Uint() / bVal.Uint()
	case reflect.Float32, reflect.Float64:
		if bVal.Float() == 0.0 {
			return nil // Avoid division by zero
		}
		return aValConverted.Float() / bVal.Float()
	default:
		return nil
	}
}

func Subtract(a, b interface{}) interface{} {
	aVal := reflect.ValueOf(a)
	bVal := reflect.ValueOf(b)

	if !aVal.IsValid() || !bVal.IsValid() || !aVal.Type().ConvertibleTo(bVal.Type()) {
		return nil
	}

	aValConverted := aVal.Convert(bVal.Type())

	switch bVal.Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return aValConverted.Int() - bVal.Int()
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return aValConverted.Uint() - bVal.Uint()
	case reflect.Float32, reflect.Float64:
		return aValConverted.Float() - bVal.Float()
	default:
		return nil
	}
}
