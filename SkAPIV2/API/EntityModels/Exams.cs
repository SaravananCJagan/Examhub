using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityModels
{
    public class Exams:BaseEntity
    {
        public long ExamBodyId { get; set; }
        public ExamsConductor ExamBody { get; set; }
        public DateTime CommencementDate { get; set; }
        public DateTime NotificationDate { get; set; }
        public DateTime ApplicationLastDate { get; set; }
        public short Duration { get; set; }
        public string NotificationLink { get; set; }
        public string ApplicationLink { get; set; }
        public string MoreDetails { get; set; }
        public short AgeLimit { get; set; }
        public string EducationalQualifications { get; set; }
        public short Vacancies { get; set; }
        public string State { get; set; }
        public bool IsPhysicalTestRequired { get; set; }
        public string Gender { get; set; }
    }

    public class ExamFilter
    {
        public string? ExamBodyId { get; set; }
        public DateTime? CommencementDateFrom { get; set; }
        public DateTime? CommencementDateTo { get; set; }
        public DateTime? NotificationDateFrom { get; set; }
        public DateTime? NotificationDateTo { get; set; }
        public DateTime? ApplicationLastDateFrom { get; set; }
        public DateTime? ApplicationLastDateTo { get; set; }
        public string? State { get; set; }
        public short? AgeLimitFrom { get; set; }
        public short? AgeLimitTo { get; set; }
        public short? VacanciesFrom { get; set; }
        public short? VacanciesTo { get; set; }
        public string? EducationalQualifications { get; set; }
    }
}
