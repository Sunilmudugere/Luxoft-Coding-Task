using System.Linq;
using AutoMapper;
using Server.DTO;
using Server.Models;

namespace Server.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<User,UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(x=>x.IsMain).Url);
            })
            .ForMember(dest => dest.Age,opt =>{
                opt.ResolveUsing(src => src.DateOfBirth.FindAge());
            });
            CreateMap<User,UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(x=>x.IsMain).Url);
            })
            .ForMember(dest => dest.Age,opt =>{
                opt.ResolveUsing(src => src.DateOfBirth.FindAge());
            });
            CreateMap<Photo,PhotosForDetailedDto>();
        }
    }
}