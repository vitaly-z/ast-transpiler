<?php
class Second {
    public function stringifyNumber($arg) {
        return ((string) $arg);
    }
}
class Test {
    public function test() {
        $a = 1;
        $b = 2;
        $c = $a + $b;
        var_dump($c); // should print 3
        $s1 = 'a';
        $s2 = 'b';
        $s3 = $s1 . $s2;
        var_dump($s3); // should print "ab"
        $x = false;
        if ($x) {
            var_dump('x is true');
        } else {
            var_dump('x is false'); // should print "x is false"
        }
        $instance = new Second();
        var_dump($instance->stringifyNumber(4)); // should print 4
        $arr = [1, 2, 3, 4];
        var_dump($arr[0]); // should print 1
        $dict = array(
            'a' => 'b',
        );
        var_dump($dict['a']); // should print "b"
    }
}

?>