This test suite is dependent on the NUnit framework within visual studio and requires nuget packages along with a NUnit manager
plugin to read the tests as Unit tests. 

Each set of functions is called to test for connection and return success along with attribute requirement.

It also outputs the return string to the output file for the test cases for viewing, to see the request the server is sending
in case of an error.

Simply take the test cases and click run all in the test explorer, or run sections of test cases based on category. Categories include:
Broadcasts, sections, sites, playlists, and templates. Each of the four functions (except sites and sections which only have one function)
are tested for output and input.

Limitations:


Currently template_create fails its test case, because the function itself fails due to incorrect data formatting for the "data"
attribute associated with the json string. Broadcast_archive and broadcast_poster are not tested because neither function responds
to volar.cs calls in their current state. 
