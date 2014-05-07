using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NUnitclassTests
{
    using NUnit.Framework;
    [TestFixture]
    public class NUnitTests
    {
        Volar volar = new Volar("DD50i3XVTpnRni7loUx9EwEmDi0sQmh1", "v|HW]gHun1ArVX-V6!E/b1S)BRYSnwl)", "uk.volarvideo.com");
        [Test]
        [Property("broadcast", "fetch_broadcasts")]
        [Category("BroadcastTests")]
        public void Broadcast_fetch()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("site", "volar");
            if(volar.broadcasts(parameter_array)==null)
                {Assert.Fail();}
            else
            {Console.Write("broadcast fetched");}
        }
        [Test]
        [Property("broadcast","broadcast_create")]
        [Category("BroadcastTests")]
        public void Broadcast_create()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("title", "fakecast");
            parameter_array.Add("contact_name", "BretMichaels");
            parameter_array.Add("contact_phone", "555-555-5555");
            parameter_array.Add("contact_email", "fakemail@somewhere.com");
            parameter_array.Add("site", "volar");
            var response = volar.broadcast_create(parameter_array);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("broadcast created");
            }

        }
        [Test]
        [Property("broadcast","broadcast_update")]
        [Category("BroadcastTests")]
        public void Broadcast_update()
        {
            SortedDictionary<string, string> arrayone = new SortedDictionary<string, string>();
            arrayone.Add("id", "683");
            arrayone.Add("site", "volar");
            arrayone.Add("contact_name", "notbrett");
            var response = volar.broadcast_update(arrayone);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder+ newstring[i]; }
                if(newstring.Contains("\"success\": false"))
                    { 
                    Assert.Fail();
                    Console.Write("failed to update contact_name");        
                    }
            else
            {
                Console.Write(holder);
                Console.Write("broadcast updated for contact_name");
            }
                SortedDictionary<string, string> arraytwo = new SortedDictionary<string, string>();
                arraytwo.Add("id", "683");
                arraytwo.Add("site", "volar");
                arraytwo.Add("title", "newtitle");
                response = volar.broadcast_update(arraytwo);
                newstring = response.ToString();
                holder = "";
                for (int i = 5; i < 21; i++)
                { holder = holder + newstring[i]; }
                if (newstring.Contains("\"success\": false"))
                { 
                    Assert.Fail();
                    Console.Write("failed to update title");
                }
                else
                {
                    Console.Write(holder);
                    Console.Write("broadcast updated");
                }
                SortedDictionary<string, string> arraythree = new SortedDictionary<string, string>();
                arraythree.Add("id", "683");
                arraythree.Add("site", "volar");
                arraythree.Add("date", "1/10/1991");
                response = volar.broadcast_update(arraythree);
                newstring = response.ToString();
                holder = "";
                for (int i = 5; i < 21; i++)
                { holder = holder + newstring[i]; }
                if (newstring.Contains("\"success\": false"))
                {
                    Assert.Fail();
                    Console.Write("failed to update date");
                }
                else
                {
                    Console.Write(holder);
                    Console.Write("broadcast updated");
                }
                SortedDictionary<string, string> arrayfour = new SortedDictionary<string, string>();
                arrayfour.Add("id", "683");
                arrayfour.Add("site", "volar");
                arrayfour.Add("description", "made up description");
                response = volar.broadcast_update(arrayfour);
                newstring = response.ToString();
                holder = "";
                for (int i = 5; i < 21; i++)
                { holder = holder + newstring[i]; }
                if (newstring.Contains("\"success\": false"))
                {
                    Assert.Fail();
                    Console.Write("failed to update description");
                }
                else
                {
                    Console.Write(holder);
                    Console.Write("broadcast updated");
                }
                SortedDictionary<string, string> arrayfive = new SortedDictionary<string, string>();
                arrayfive.Add("id", "683");
                arrayfive.Add("site", "volar");
                arrayfive.Add("section_id", "2");
                response = volar.broadcast_update(arrayfive);
                newstring = response.ToString();
                holder = "";
                for (int i = 5; i < 21; i++)
                { holder = holder + newstring[i]; }
                if (newstring.Contains("\"success\": false"))
                {
                    Assert.Fail();
                    Console.Write("failed to update section id");
                }
                else
                {
                    Console.Write(holder);
                    Console.Write("broadcast updated");
                }
        }
        [Test]
        [Property("broadcast","broadcasts")]
        [Category("BroadcastTests")]
        public void Broadcast_delete()
        {
            SortedDictionary<string, string> array = new SortedDictionary<string, string>();
            array.Add("id", "687");
            array.Add("site", "volar");
            var response = volar.broadcast_delete(array);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("broadcast deleted");
            }
        }
        [Test]
        [Property("playlist", "playlists")]
        [Category("PlaylistTests")]
        public void PlaylistsTest()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("site", "volar");
            if (volar.playlists(parameter_array) == null)
            { Assert.Fail(); }
            else
            { Console.Write("playlist fetched"); }
            //  Assert.Fail();
        }
        [Test]
        [Property("Playlist", "Playlist create")]
        [Category("PlaylistTests")]
        public void Playlist_create()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("site", "volar");
            parameter_array.Add("title", "fakelistone");
            var response = volar.playlist_create(parameter_array);
            Console.Write(response);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("broadcast created");
            }

        }
        [Test]
        [Property("Playlist", "Playlist update")]
        [Category("PlaylistTests")]
        public void Playlist_update()
        {
            SortedDictionary<string, string> arrayone = new SortedDictionary<string, string>();
            arrayone.Add("description", "new playlist description"); 
            arrayone.Add("data", "[{\"title\"=> \"Temp title\", \"type\"=>\"single-line\"}]");
            arrayone.Add("site", "volar");
            arrayone.Add("title", "fakelist");
            var response = volar.playlist_update(arrayone);
            Console.Write(response);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            {
                Console.Write("failed to update playlist description");
                Assert.Fail();
            }
            else
            {
                Console.Write(holder);
                Console.Write("broadcast updated for contact_name");
            }
            
        }
        [Test]
        [Property("Playlist", "Playlist delete")]
        [Category("PlaylistTests")]
        public void Playlist_delete()
        {
            SortedDictionary<string, string> array = new SortedDictionary<string, string>();
            array.Add("site", "volar");
            array.Add("title", "fakelist");
            var response = volar.playlist_delete(array);
            string newstring = response.ToString();
            Console.Write(response);
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("playlist deleted");
            }
        }

        [Test]
        [Property("section", "sections")]
        [Category("SectionTest")]
        public void SectionTest()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("site", "volar");
            if (volar.sections(parameter_array) == null)
            { Assert.Fail(); }
            else
            { Console.Write("section fetched"); }
            //  Assert.Fail();
        }
        [Test]
        [Property("template", "templates")]
        [Category("TemplateTest")]
        public void TemplateTest()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            parameter_array.Add("site", "volar");
            var response = volar.templates(parameter_array);
            if (response == null)
            { Assert.Fail(); }
            else
            { Console.Write("section fetched");
            Console.Write(response);
            }
            //  Assert.Fail();
        }
        [Test]
        [Property("template", "templates")]
        [Category("TemplateCreateTest")]
        public void TemplateCreateTest()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("data", "{'title'=> 'Temp title', 'type'=>'single-line'}");
            parameter_array.Add("title", "c#template");
            parameter_array.Add("site", "volar");
            var response = volar.template_create(parameter_array);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("template created");
            }
            //  Assert.Fail();
        }
        [Test]
        [Property("template", "templates")]
        [Category("TemplateUpdateTest")]
        public void TemplateUpdateTest()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("id", "1");
            parameter_array.Add("title", "c#template");
            parameter_array.Add("site", "volar");
            var response = volar.template_update(parameter_array);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("template updated");
            }
            //  Assert.Fail();
        }
        [Test]
        [Property("template", "templates")]
        [Category("TemplateDeleteTest")]
        public void TemplateDeleteTest()
        {
            SortedDictionary<string, string> parameter_array = new SortedDictionary<string, string>();
            Console.Write(volar.sites(parameter_array));
            parameter_array.Add("id", "5");
            parameter_array.Add("site", "volar");
            var response = volar.template_update(parameter_array);
            string newstring = response.ToString();
            string holder = "";
            for (int i = 5; i < 21; i++)
            { holder = holder + newstring[i]; }
            if (newstring.Contains("\"success\": false"))
            { Assert.Fail(); }
            else
            {
                Console.Write(holder);
                Console.Write("template deleted");
            }
            //  Assert.Fail();
        }
    }
}
