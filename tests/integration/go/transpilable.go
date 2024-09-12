package main


import (
    "fmt"
)

type Second struct {

}
func  (this *Second) StringifyNumber(arg interface{}) interface{}  {
    return ToString(arg)
}
type Test struct {

}
func  (this *Test) Test()  {
    var a interface{} = 1
    var b interface{} = 2
    var c interface{} = Add(a, b)
    fmt.Println(c) // should print 3
    var s1 interface{} = "a"
    var s2 interface{} = "b"
    var s3 interface{} = Add(s1, s2)
    fmt.Println(s3) // should print "ab"
    var x interface{} = false
    if IsTrue(x) {
        fmt.Println("x is true")
    } else {
        fmt.Println("x is false") // should print "x is false"
    }
    instance := new(Second)
    fmt.Println(instance.StringifyNumber(4)) // should print 4
    var arr interface{} = []interface{}{1, 2, 3, 4}
    fmt.Println(GetArrayLength(arr)) // should print 4
    var first interface{} = GetValue(arr, 0)
    fmt.Println(first) // should print 1
    var dict interface{} = map[string]interface{} {
        "a": "b",
    }
    fmt.Println(GetValue(dict, "a")) // should print "b"
    var i interface{} = 0
    for w := 0; IsLessThan(w, 10); w++ {
        i = Add(i, 1)
    }
    fmt.Println(ToString(i)) // should print 10
    var list2 interface{} = []interface{}{1, 2, 3, 4, 5}
    Reverse(list2)
    fmt.Println(GetValue(list2, 0)) // should print 5
    //should delete key from dict
    var dict2 interface{} = map[string]interface{} {
        "a": 1,
        "b": 2,
    }
    Remove(dict2, "a")
    var dictKeys interface{} = ObjectKeys(dict2)
    fmt.Println(GetArrayLength(dictKeys)) // should print 1
    fmt.Println(GetValue(dictKeys, 0)) // should print "b"
}
