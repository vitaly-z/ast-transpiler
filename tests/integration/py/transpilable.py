class Second:
    def stringify_number(self, arg):
        return str(arg)
class Test:
    def test(self):
        a = 1
        b = 2
        c = a + b
        print(c)  # should print 3
        s1 = 'a'
        s2 = 'b'
        s3 = s1 + s2
        print(s3)  # should print "ab"
        x = False
        if x:
            print('x is true')
        else:
            print('x is false')  # should print "x is false"
        instance = Second()
        print(instance.stringify_number(4))  # should print 4
        arr = [1, 2, 3, 4]
        print(arr[0])  # should print 1
        dict = {
            'a': 'b',
        }
        print(dict['a'])  # should print "b"
