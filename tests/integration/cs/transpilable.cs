namespace tests;
class Second
{
    public virtual object stringifyNumber(object arg)
    {
        return ((object)arg).ToString();
    }
}
partial class Test
{
    public virtual void test()
    {
        object a = 1;
        object b = 2;
        object c = add(a, b);
        Console.WriteLine(c); // should print 3
        object s1 = "a";
        object s2 = "b";
        object s3 = add(s1, s2);
        Console.WriteLine(s3); // should print "ab"
        object x = false;
        if (isTrue(x))
        {
            Console.WriteLine("x is true");
        } else
        {
            Console.WriteLine("x is false"); // should print "x is false"
        }
        var instance = new Second();
        Console.WriteLine(instance.stringifyNumber(4)); // should print 4
        object arr = new List<object>() {1, 2, 3, 4};
        object first = getValue(arr, 0);
        Console.WriteLine(first); // should print 1
        object dict = new Dictionary<string, object>() {
            { "a", "b" },
        };
        Console.WriteLine(getValue(dict, "a")); // should print "b"
    }
}
