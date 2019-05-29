using System;

namespace newProj.API.Models
{
    public class Photo
    {
        public string Id{get;set;}
        public string Url{get;set;}
        public string Description{get;set;}
        public DateTime AddedOn{get;set;}
        public bool IsMain{get;set;}

        public User User{get;set;}
        public int UserId{get;set;}
    }
}