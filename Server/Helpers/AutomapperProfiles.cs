using System.Linq;
using AutoMapper;
using newProj.API.DTO;
using newProj.API.Models;

namespace newProj.API.Helpers
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