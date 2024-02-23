
class Second {
    public stringifyNumber(arg: number) {
        return arg.toString();
    }
}

class Test {

    public test() {
        var a = 1;
        var b = 2;
        var c = a + b;
        console.log(c); // should print 3
        var s1 = "a";
        var s2 = "b";
        var s3 = s1 + s2;
        console.log(s3); // should print "ab"
        let x = false;
        if (x) {
            console.log("x is true");
        } else {
            console.log("x is false"); // should print "x is false"
        }

        var instance = new Second();
        console.log(instance.stringifyNumber(4)); // should print 4

        const arr = [1,2,3,4];

        console.log(arr.length); // should print 4

        const first = arr[0];
        console.log(first); // should print 1

        const dict = {"a": "b"};
        console.log(dict["a"]); // should print "b"

        let i = 0;
        for (let w = 0; w < 10; w++) {
            i++;
        }
        console.log(i.toString()); // should print 10

        const list = [1,2,3,4,5];
        list.reverse();
        console.log(list[0]); // should print 5
    }
}

export {
    Test
}