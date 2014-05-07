using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Volar volar = new Volar("DD50i3XVTpnRni7loUx9EwEmDi0sQmh1", "v|HW]gHun1ArVX-V6!E/b1S)BRYSnwl)", "uk.volarvideo.com");
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            SortedDictionary<string, string> array = new SortedDictionary<string, string>();
            SortedDictionary<string, string> otherarray = new SortedDictionary<string, string>();
           // Console.Write(volar.sites(parameter_array));
            parameter_array.Add("title", "fakecast");
            parameter_array.Add("contact_name", "BretMichaels");
            parameter_array.Add("contact_phone", "555-555-5555");
            parameter_array.Add("contact_email", "fakemail@somewhere.com");
            parameter_array.Add("site", "volar");
            array.Add("id", "683");
            array.Add("site", "volar");
            array.Add("contact_name", "somethingelse");
            otherarray.Add("data", "array(array(\"this is the field title\",\"type\" : (string) \"single-line\"))");
            otherarray.Add("site", "volar");
            otherarray.Add("title", "fakecast");
            // Console.Write(volar.broadcast_create(other_array));
            //Console.Write(volar.broadcasts(parameter_array));
           // Console.Write(volar.sites(other_array));
          //  Console.Write(volar.sites(parameter_array));
            //Console.Write(volar.broadcast_create(parameter_array));
            //Console.Write(volar.broadcasts(parameter_array));
                //parameter_array["title"] = "newtitle";
             //   var response = volar.broadcast_update(array);
             //   response.ToString();
            //    string newstring = response.ToString();
            //    for(int i = 5; i<20; i++)
            //    { Console.Write(newstring[i]); }
            //Console.Write(response);
            //Console.Write(volar.broadcast_update(array));
            //Console.Write(volar.broadcast_poster(array, "C:\\Users\\Richard\\Pictures","c#"));
            Console.Write(volar.sections(parameter_array));
            Console.Write(volar.templates(parameter_array));
            Console.ReadLine();
           //  string[] stringholder = new string[]{"\"title\" : (string) \"this is the field title","type\" : (string) \"this is the type of field"};
           //string[][] playlistarray = new string[][]{stringholder};
            Environment.Exit(0);
        }
    }
}
