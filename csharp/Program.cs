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

            Console.Write(volar.sites(parameter_array));

            parameter_array.Add("site", "volar");
            Console.Write(volar.broadcasts(parameter_array));
            Console.ReadLine();
        }
    }
}