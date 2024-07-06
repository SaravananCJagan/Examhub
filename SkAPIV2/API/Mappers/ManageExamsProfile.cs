using AutoMapper;
using DTOs;
using EntityModels;

namespace Mappers
{
    public class ManageExamsProfile : Profile
    {
        public ManageExamsProfile()
        {
            CreateMap<ExamsConductor, ExamConductorDTO>()
                .ReverseMap();

            CreateMap<ExamDTO,Exams>()
                .ForMember(dest => dest.AgeLimit, src => src.MapFrom(option => option.ExamAgeLimit))
                .ForMember(dest=>dest.ApplicationLink, src=>src.MapFrom(option=>option.ExamApplicationLink))
                .ForMember(dest => dest.NotificationLink, src => src.MapFrom(option => option.ExamNotificationLink))
                .ForMember(dest => dest.Duration, src => src.MapFrom(option => option.ExamDuration))
                .ForMember(dest => dest.CommencementDate, src => src.MapFrom(option => option.ExamDate))
                .ForMember(dest => dest.EducationalQualifications, src => src.MapFrom(option => option.ExamEduEligibility))
                .ForMember(dest => dest.MoreDetails, src => src.MapFrom(option => option.ExamMoreDetails))
                .ForMember(dest => dest.Vacancies, src => src.MapFrom(option => option.ExamVacancy))
                .ForMember(dest => dest.State, src => src.MapFrom(option => option.ExamState))
                .ForMember(dest => dest.IsPhysicalTestRequired, src => src.MapFrom(option => option.IsPhysicalTest))
                .ReverseMap();
            CreateMap<ExamFilter, ExamFilterDTO>().ReverseMap();
        }       
    }
}