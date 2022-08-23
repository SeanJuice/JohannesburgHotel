using API.Models;
using System.Collections.Generic;

namespace API.ViewModel
{
    public class UserViewModel
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }

        public List<Room> BookedRooms { get; set; }
        public List<Amenity> amenities { get; set; }

    }
}