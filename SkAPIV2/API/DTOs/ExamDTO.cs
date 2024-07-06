using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class ExamDTO: BaseDTO
    {
        public ExamConductorDTO? ExamBody { get; set; }
        public long ExamBodyId { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime NotificationDate { get; set; }
        public DateTime ApplicationLastDate { get; set; }
        public short ExamDuration { get; set; }
        public string ExamNotificationLink { get; set; }
        public string ExamApplicationLink { get; set; }
        public string? ExamMoreDetails { get; set; }
        public short ExamAgeLimit { get; set; }
        public string ExamEduEligibility { get; set; }
        public short ExamVacancy { get; set; }
        public string? ExamState { get; set; }
        public bool IsPhysicalTest { get; set; }
        public string? Gender { get; set; }
    }

    public class ExamFilterDTO
    {
        public string? ExamBodyId { get; set;}
        public DateTime? CommencementDateFrom { get; set; }
        public DateTime? NotificationDateFrom { get; set; }
        public DateTime? ApplicationLastDateFrom { get; set; }
        public DateTime? CommencementDateTo { get; set; }
        public DateTime? NotificationDateTo { get; set; }
        public DateTime? ApplicationLastDateTo { get; set; }
        public string? State { get; set; }
        public short? AgeLimit { get; set; }
        public short? Vacancies { get; set; }
        public string? EducationalQualifications { get; set; }
    }
}
