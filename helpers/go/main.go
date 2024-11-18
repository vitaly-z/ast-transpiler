package main

import "fmt"

type A struct {
}

func (this *A) main(a interface{}, b interface{}) {
	// arr := []interface{}{}
	// arr = appendToArray(arr, 1).([]interface{})
	// fmt.Println(arr)
	arr := []interface{}{1}
	addElementToObject(arr, 0, 2)
	fmt.Println(arr)
}

func main() {
	a := A{}
	a.main(1, 2)
}
