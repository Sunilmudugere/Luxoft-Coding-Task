using System;

namespace newProj.API.DTO
{
    public class PhotosForDetailedDto
    {
          public string Id{get;set;}
        public string Url{get;set;}
        public string Description{get;set;}
        public DateTime AddedOn{get;set;}
        public bool IsMain{get;set;}
    }
}